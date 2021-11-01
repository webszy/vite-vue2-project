import path from "path"
import {defineConfig} from "vite"
import { createVuePlugin } from 'vite-plugin-vue2'
import WindiCSS from "vite-plugin-windicss"
import usePluginImport from 'vite-plugin-importer'
import legacy from '@vitejs/plugin-legacy'
import compress from 'vite-plugin-compress'
import pkg from './package.json'
export default defineConfig({
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "src"),
        },
        dedupe: ["vue-demi"],
    },
    build: {
        minify: true,
    },
    plugins: [
        createVuePlugin(/* options */),
        WindiCSS(),
        usePluginImport({
            libraryName: 'vant',
            libraryDirectory: 'es',
            style: (name) => `${name}/index.css`,
        }),
        legacy({
            targets: ["> 1%", "last 4 versions", "not dead"]
        }),
        compress()
    ],
    server:{
        host:'0.0.0.0',
        port:8080
    },
    define:{
        buildTime: JSON.stringify(new Date().toLocaleString()),
        VITE_APP_VERSION: JSON.stringify(pkg.version)
    }
})
