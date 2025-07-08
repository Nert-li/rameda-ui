#!/bin/bash

# Получаем текущую версию
version=$(cat VERSION)

# Увеличиваем патч-версию
new_version=$(echo $version | awk -F. -v OFS=. '{$NF+=1; print}')

# Записываем новую версию
echo $new_version > VERSION

echo "🔁 VERSION bump: $version → $new_version" 