import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue'
import laravel from 'laravel-vite-plugin';

export default defineConfig({
    plugins: [
        laravel({
            // input: ['resources/css/app.css', 'resources/js/app.js'],
            // input: ['resources/js/app.js'],
            input: ['src/main.js'],
            refresh: true,
        }),
        vue()
    ],
    server: { 
    //     https: true, 
    //     host: 'localhost',
        hmr: { overlay: false },

    },
    build: {

        /** If you set esmExternals to true, this plugins assumes that 
          all external dependencies are ES modules */
     
        commonjsOptions: {
           esmExternals: true 
        },
     }
});
