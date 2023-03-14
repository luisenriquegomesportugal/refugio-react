import {defineConfig} from 'vite'
import {resolve} from 'path'
import react from '@vitejs/plugin-react'
import inject from "@rollup/plugin-inject"

export default defineConfig({
    resolve: {
        alias: {
            '~bootstrap': resolve(__dirname, 'node_modules/bootstrap'),
            '~aos': resolve(__dirname, 'node_modules/aos'),
            '~perfect-scrollbar': resolve(__dirname, 'node_modules/perfect-scrollbar'),
            '~metismenu': resolve(__dirname, 'node_modules/metismenu'),
            '~theme': resolve(__dirname, 'theme'),
        }
    },
    plugins: [
        inject({
            $: 'jquery',
            jQuery: 'jquery',
        }),
        react(),
    ],
    build: {
        outDir: 'docs'
    }
})
