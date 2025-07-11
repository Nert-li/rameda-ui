import { useTheme } from "@/shared/lib/react/use-theme";
import { cn } from "@/shared/lib/css";
import { useEffect, useState } from "react";

interface LogoProps {
    className?: string;
    size?: "sm" | "md" | "lg";
    showText?: boolean;
    textClassName?: string;
}

export function Logo({
    className,
    size = "md",
    showText = true,
    textClassName
}: LogoProps) {
    const { theme } = useTheme();
    const [systemTheme, setSystemTheme] = useState<"light" | "dark">("light");

    // Отслеживаем изменения системной темы
    useEffect(() => {
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

        const updateSystemTheme = () => {
            setSystemTheme(mediaQuery.matches ? "dark" : "light");
        };

        // Инициализируем
        updateSystemTheme();

        // Добавляем слушатель
        mediaQuery.addEventListener("change", updateSystemTheme);

        // Очищаем слушатель при размонтировании
        return () => mediaQuery.removeEventListener("change", updateSystemTheme);
    }, []);

    // Определяем какой логотип использовать
    const getLogoSrc = () => {
        let effectiveTheme = theme;

        if (theme === 'system') {
            effectiveTheme = systemTheme;
        }

        return effectiveTheme === 'dark' ? '/icon-white.svg' : '/icon-black.svg';
    };

    // Размеры для разных вариантов
    const sizeClasses = {
        sm: "w-4 h-4",
        md: "w-6 h-6",
        lg: "w-8 h-8"
    };

    return (
        <div className="flex items-center gap-2">
            <img
                src={getLogoSrc()}
                alt="Rameda"
                className={cn(sizeClasses[size], className)}
                onError={() => {
                    // Fallback если изображение не загружается
                    console.warn("Logo image failed to load:", getLogoSrc());
                }}
            />
            {showText && (
                <span className={cn("font-semibold", textClassName)}>
                    Rameda
                </span>
            )}
        </div>
    );
}
