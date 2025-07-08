#!/bin/bash

set -e

### === НАСТРОЙКИ === ###
PROJECT_ID="rameda-465221"
LOCATION="europe-west3"  # Используем европейский репозиторий для меньшей задержки
BUCKET="rameda-ui-static"
CDN_HOST="https://storage.googleapis.com/rameda-ui-static"
IMAGE_NAME="europe-west3-docker.pkg.dev/${PROJECT_ID}/gcr/rameda-ui"
VERSION=$(cat VERSION)
TAG="v${VERSION}"
STATIC_PATH="static/${TAG}"
BUILD_DIR="dist"
PUBLIC_URL="${CDN_HOST}/${STATIC_PATH}"

echo "🔧 Сборка UI с VITE_BASE_URL=${PUBLIC_URL}/"

### === ПРОВЕРКИ ПЕРЕД НАЧАЛОМ === ###
echo "🔍 Проверка окружения..."

# Сохраняем текущий активный аккаунт
CURRENT_ACCOUNT=$(gcloud auth list --filter=status:ACTIVE --format="value(account)" | head -1)
echo "📝 Текущий аккаунт: $CURRENT_ACCOUNT"

# Проверяем авторизацию в gcloud
if [ -z "$CURRENT_ACCOUNT" ]; then
    echo "❌ Не авторизован в gcloud! Выполните: gcloud auth login"
    exit 1
fi

# Проверяем что проект установлен
CURRENT_PROJECT=$(gcloud config get-value project 2>/dev/null || echo "")
if [ "$CURRENT_PROJECT" != "$PROJECT_ID" ]; then
    echo "🔧 Переключаюсь на проект $PROJECT_ID"
    gcloud config set project "$PROJECT_ID"
fi

# Переключаемся на основной аккаунт для работы с GCS (если используется k8s-artifact-registry)
if [[ "$CURRENT_ACCOUNT" == "k8s-artifact-registry@rameda-465221.iam.gserviceaccount.com" ]]; then
    echo "🔧 Переключаюсь на основной аккаунт для работы с GCS..."
    # Находим основной аккаунт пользователя (не сервисный)
    USER_ACCOUNT=$(gcloud auth list --format="value(account)" | grep -v "@rameda-465221.iam.gserviceaccount.com" | head -1)
    if [ -n "$USER_ACCOUNT" ]; then
        gcloud config set account "$USER_ACCOUNT"
        echo "✅ Переключился на: $USER_ACCOUNT"
    else
        echo "❌ Основной аккаунт пользователя не найден! Авторизуйтесь: gcloud auth login"
        exit 1
    fi
elif [[ "$CURRENT_ACCOUNT" == "github@rameda-465221.iam.gserviceaccount.com" ]]; then
    echo "✅ Используется GitHub CI/CD аккаунт с полными правами"
else
    echo "✅ Используется основной аккаунт: $CURRENT_ACCOUNT"
fi

# Настраиваем Docker для работы с Artifact Registry
echo "🔐 Настройка Docker для Artifact Registry..."
gcloud auth configure-docker europe-west3-docker.pkg.dev --quiet

# Проверяем что репозиторий существует
if ! gcloud artifacts repositories describe gcr --location="$LOCATION" --quiet >/dev/null 2>&1; then
    echo "❌ Репозиторий gcr не найден в $LOCATION!"
    echo "📋 Доступные репозитории:"
    gcloud artifacts repositories list
    exit 1
fi

# Проверяем наличие bun
if ! command -v bun &> /dev/null; then
    echo "❌ bun не установлен! Установите: curl -fsSL https://bun.sh/install | bash"
    exit 1
fi

# Проверяем права на GCS bucket
echo "🔍 Проверка прав доступа к GCS bucket..."
if ! gsutil ls "gs://${BUCKET}/" >/dev/null 2>&1; then
    echo "❌ Нет доступа к bucket gs://${BUCKET}/"
    echo "🔧 Проверьте права доступа или создайте bucket:"
    echo "   gsutil mb gs://${BUCKET}"
    exit 1
fi

### === СБОРКА ПРОЕКТА === ###
# Используем VITE_BASE_URL вместо PUBLIC_URL для совместимости с vite.config.ts
VITE_BASE_URL="${PUBLIC_URL}/" bun run build

### === ЗАГРУЗКА СТАТИКИ В GCS === ###
echo "🚀 Загрузка в GCS: $STATIC_PATH"

# Проверяем что папка dist существует
if [ ! -d "$BUILD_DIR" ]; then
    echo "❌ Папка $BUILD_DIR не найдена! Проверьте сборку."
    exit 1
fi

# Загружаем assets если они есть
if [ -d "$BUILD_DIR/assets" ]; then
    echo "📦 Загружаю assets..."
    gsutil -m cp -r "$BUILD_DIR/assets" "gs://${BUCKET}/${STATIC_PATH}/"
fi

# Загружаем JS файлы
if ls "$BUILD_DIR"/*.js 1> /dev/null 2>&1; then
    echo "📦 Загружаю JS файлы..."
    gsutil -m cp "$BUILD_DIR"/*.js "gs://${BUCKET}/${STATIC_PATH}/"
fi

# Загружаем CSS файлы
if ls "$BUILD_DIR"/*.css 1> /dev/null 2>&1; then
    echo "📦 Загружаю CSS файлы..."
    gsutil -m cp "$BUILD_DIR"/*.css "gs://${BUCKET}/${STATIC_PATH}/"
fi

# Устанавливаем кеширование для статических файлов
echo "⚙️ Устанавливаю заголовки кеширования..."
gsutil -m setmeta -h "Cache-Control:public,max-age=31536000,immutable" "gs://${BUCKET}/${STATIC_PATH}/**" 2>/dev/null || echo "⚠️ Предупреждение: не удалось установить заголовки кеширования"

### === ПОДГОТОВКА КОНТЕЙНЕРА (только index.html) === ###
echo "📦 Подготовка временной директории для Docker"
TMPDIR=$(mktemp -d)
mkdir -p "$TMPDIR/app"

# Проверяем что index.html существует
if [ ! -f "$BUILD_DIR/index.html" ]; then
    echo "❌ Файл $BUILD_DIR/index.html не найден!"
    rm -rf "$TMPDIR"
    exit 1
fi

cp "$BUILD_DIR/index.html" "$TMPDIR/app/"

cat > "$TMPDIR/Dockerfile" <<EOF
FROM nginx:1.25-alpine
COPY app/index.html /usr/share/nginx/html/index.html
RUN rm -rf /etc/nginx/conf.d/* && \\
    echo 'server { listen 80; root /usr/share/nginx/html; index index.html; location / { try_files \$uri /index.html; } }' > /etc/nginx/conf.d/default.conf
EXPOSE 80
EOF

### === СБОРКА И ПУШ === ###
echo "🐳 Сборка Docker-образа: $IMAGE_NAME:$TAG"
docker build -t "$IMAGE_NAME:$TAG" "$TMPDIR"

echo "🚀 Пуш Docker-образа в Artifact Registry..."
docker push "$IMAGE_NAME:$TAG"

# Также создаем тег latest
echo "🏷️ Создаю тег latest..."
docker tag "$IMAGE_NAME:$TAG" "$IMAGE_NAME:latest"
docker push "$IMAGE_NAME:latest"

### === ОЧИСТКА === ###
rm -rf "$TMPDIR"

echo ""
echo "✅ Готово: версия $TAG загружена в CDN и собрана в Artifact Registry"
echo "📍 Статика доступна по: ${CDN_HOST}/${STATIC_PATH}/"
echo "🐳 Docker образ: $IMAGE_NAME:$TAG"
echo "📦 Все образы в репозитории: europe-west3-docker.pkg.dev/${PROJECT_ID}/gcr/"
echo ""
echo "🔍 Для просмотра образов выполните:"
echo "   gcloud artifacts docker images list europe-west3-docker.pkg.dev/${PROJECT_ID}/gcr" 