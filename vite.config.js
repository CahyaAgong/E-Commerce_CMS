import { defineConfig, loadEnv } from 'vite';
import laravel from 'laravel-vite-plugin';

import react from '@vitejs/plugin-react';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

export default defineConfig(config => {
    const env = loadEnv(config.mode, process.cwd(), '');

    return {
        define: {
            __APP_ENV__: JSON.stringify(env.APP_ENV),
        },
        plugins: [
            laravel({
                input: ['resources/react/styles.index.scss', 'resources/react/index.tsx'],
                refresh: true,
                postcss: [
                    tailwindcss(),
                    autoprefixer(),
                ],
            }),
            react(),
        ],
        css: {
            preprocessorOptions: {
                scss: {},
            },
        },
    }
});
