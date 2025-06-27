import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths(), tailwindcss()],
  build: {
    // Улучшенный tree-shaking
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log'],
        unused: true,
      },
    },
    // Разделение chunks для лучшего кеширования
    rollupOptions: {
      output: {
        manualChunks: {
          // Разделяем крупные библиотеки
          vendor: ['react', 'react-dom'],
          ui: ['@radix-ui/react-slot'],
          charts: ['recharts'],
          routing: ['react-router-dom'],
          query: ['@tanstack/react-query'],
          icons: ['lucide-react', '@tabler/icons-react'],
        },
      },
      // Внешние зависимости для лучшего tree-shaking  
      external: () => false,
    },
    // Анализ размера бандла
    reportCompressedSize: true,
    chunkSizeWarningLimit: 1000,
  },
  // Оптимизация для development
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      '@radix-ui/react-slot',
      'lucide-react',
    ],
    exclude: [
      // Исключаем неиспользуемые компоненты из pre-bundling
      '@radix-ui/react-accordion',
      '@radix-ui/react-scroll-area',
    ],
  },
});
