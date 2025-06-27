#!/usr/bin/env node

import { readFileSync, readdirSync, statSync } from 'fs';
import { join, extname } from 'path';

const RADIX_PACKAGES = [
    '@radix-ui/react-accordion',
    '@radix-ui/react-avatar',
    '@radix-ui/react-checkbox',
    '@radix-ui/react-dialog',
    '@radix-ui/react-dropdown-menu',
    '@radix-ui/react-label',
    '@radix-ui/react-scroll-area',
    '@radix-ui/react-select',
    '@radix-ui/react-separator',
    '@radix-ui/react-slot',
    '@radix-ui/react-switch',
    '@radix-ui/react-tabs',
    '@radix-ui/react-toggle',
    '@radix-ui/react-toggle-group',
    '@radix-ui/react-tooltip'
];

const UI_COMPONENTS = [
    'accordion', 'avatar', 'badge', 'breadcrumb', 'button',
    'card', 'chart', 'checkbox', 'dialog', 'drawer',
    'dropdown-menu', 'form', 'input', 'label', 'scroll-area',
    'select', 'separator', 'sheet', 'sidebar', 'skeleton',
    'sonner', 'switch', 'table', 'tabs', 'toggle',
    'toggle-group', 'tooltip'
];

const SRC_DIR = './src';

function getAllFiles(dir, extensions = ['.tsx', '.ts']) {
    let files = [];

    try {
        const items = readdirSync(dir);

        for (const item of items) {
            const fullPath = join(dir, item);
            const stat = statSync(fullPath);

            if (stat.isDirectory()) {
                files = files.concat(getAllFiles(fullPath, extensions));
            } else if (extensions.includes(extname(fullPath))) {
                files.push(fullPath);
            }
        }
    } catch (err) {
        console.warn(`Cannot read directory ${dir}:`, err.message);
    }

    return files;
}

function analyzeComponentUsage() {
    const allFiles = getAllFiles(SRC_DIR);
    const componentUsage = {};
    const radixUsage = {};

    // Инициализация счетчиков
    UI_COMPONENTS.forEach(comp => {
        componentUsage[comp] = {
            count: 0,
            files: []
        };
    });

    RADIX_PACKAGES.forEach(pkg => {
        radixUsage[pkg] = {
            count: 0,
            files: []
        };
    });

    // Анализ файлов
    allFiles.forEach(filePath => {
        try {
            const content = readFileSync(filePath, 'utf-8');

            // Поиск импортов UI компонентов
            UI_COMPONENTS.forEach(comp => {
                const patterns = [
                    new RegExp(`from "@/shared/ui/kit/${comp}"`, 'g'),
                    new RegExp(`import.*from.*"@/shared/ui/kit/${comp}"`, 'g')
                ];

                patterns.forEach(pattern => {
                    const matches = content.match(pattern);
                    if (matches) {
                        componentUsage[comp].count += matches.length;
                        if (!componentUsage[comp].files.includes(filePath)) {
                            componentUsage[comp].files.push(filePath);
                        }
                    }
                });
            });

            // Поиск прямых импортов Radix UI
            RADIX_PACKAGES.forEach(pkg => {
                const pattern = new RegExp(`from "${pkg}"`, 'g');
                const matches = content.match(pattern);
                if (matches) {
                    radixUsage[pkg].count += matches.length;
                    if (!radixUsage[pkg].files.includes(filePath)) {
                        radixUsage[pkg].files.push(filePath);
                    }
                }
            });

        } catch (err) {
            console.warn(`Cannot read file ${filePath}:`, err.message);
        }
    });

    return { componentUsage, radixUsage };
}

function generateReport() {
    console.log('🔍 Bundle Size Audit Report\n');
    console.log('='.repeat(50));

    const { componentUsage, radixUsage } = analyzeComponentUsage();

    // Отчет по UI компонентам
    console.log('\n📦 UI Components Usage:');
    console.log('-'.repeat(30));

    const usedComponents = [];
    const unusedComponents = [];

    Object.entries(componentUsage).forEach(([comp, data]) => {
        if (data.count > 0) {
            usedComponents.push({ name: comp, ...data });
            console.log(`✅ ${comp}: ${data.count} imports in ${data.files.length} files`);
        } else {
            unusedComponents.push(comp);
        }
    });

    // Неиспользуемые компоненты
    if (unusedComponents.length > 0) {
        console.log('\n❌ Unused UI Components:');
        console.log('-'.repeat(30));
        unusedComponents.forEach(comp => {
            console.log(`   • ${comp}`);
        });
    }

    // Прямые импорты Radix UI
    console.log('\n🔧 Direct Radix UI Imports:');
    console.log('-'.repeat(30));

    const directRadixImports = Object.entries(radixUsage).filter(([_, data]) => data.count > 0);

    if (directRadixImports.length > 0) {
        directRadixImports.forEach(([pkg, data]) => {
            console.log(`⚠️  ${pkg}: ${data.count} direct imports in ${data.files.length} files`);
            data.files.forEach(file => {
                console.log(`     • ${file.replace('./src/', 'src/')}`);
            });
        });
    } else {
        console.log('✅ No direct Radix UI imports found (good for tree-shaking)');
    }

    // Статистика
    console.log('\n📊 Statistics:');
    console.log('-'.repeat(30));
    console.log(`Total UI Components: ${UI_COMPONENTS.length}`);
    console.log(`Used Components: ${usedComponents.length}`);
    console.log(`Unused Components: ${unusedComponents.length}`);
    console.log(`Optimization Potential: ${Math.round((unusedComponents.length / UI_COMPONENTS.length) * 100)}%`);

    // Рекомендации
    console.log('\n💡 Recommendations:');
    console.log('-'.repeat(30));

    if (unusedComponents.length > 0) {
        console.log('1. Consider removing unused UI components:');
        unusedComponents.forEach(comp => {
            console.log(`   • Delete src/shared/ui/kit/${comp}.tsx`);
        });
    }

    if (directRadixImports.length > 0) {
        console.log('2. Direct Radix UI imports found. Consider moving to reusable components.');
    }

    console.log('3. Enable Vite bundle analysis:');
    console.log('   • Add vite-bundle-analyzer plugin');
    console.log('   • Configure rollup options for better tree-shaking');

    // Проверка package.json на неиспользуемые Radix пакеты
    try {
        const packageJson = JSON.parse(readFileSync('./package.json', 'utf-8'));
        const installedRadixPackages = Object.keys(packageJson.dependencies || {})
            .filter(pkg => pkg.startsWith('@radix-ui/'));

        console.log('\n📋 Package.json Analysis:');
        console.log('-'.repeat(30));
        console.log('Installed Radix UI packages:');
        installedRadixPackages.forEach(pkg => {
            const isUsed = radixUsage[pkg] && radixUsage[pkg].count > 0;
            console.log(`${isUsed ? '✅' : '❌'} ${pkg}`);
        });
    } catch (err) {
        console.warn('Cannot analyze package.json:', err.message);
    }

    console.log('\n' + '='.repeat(50));
}

// Запуск анализа
generateReport();