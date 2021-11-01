import path from "path"
import {defineConfig} from "vite"
import { createVuePlugin } from 'vite-plugin-vue2'
import WindiCSS from "vite-plugin-windicss"
import usePluginImport from 'vite-plugin-importer'
import legacy from '@vitejs/plugin-legacy'
import compress from 'vite-plugin-compress'
import ScriptSetup from 'unplugin-vue2-script-setup/vite'
import pkg from './package.json'

const baseConfig = {
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "src"),
        },
        dedupe: ["vue-demi"],
    },
    build: {
        minify: true,
        assetsDir:'./static',
        sourcemap:false,
        manifest:true
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
        compress(),
        ScriptSetup({ refTransform: true })
    ],
    css:{
        postcss:{
            plugins: [
                require('autoprefixer')({overrideBrowserslist:["> 1%", "last 4 versions", "not dead","iOS >= 11","Android > 4"]}),
                require('postcss-pxtorem')({rootValue: 100,propList: ['*']}),
                require('postcss-nested')
            ]
        }
    },
    server:{
        host:'0.0.0.0',
        port:8080,
        open: true
    },
    define:{
        buildTime: JSON.stringify(new Date().toLocaleString()),
        VITE_APP_VERSION: JSON.stringify(pkg.version)
    }
}
export default defineConfig(({command,mode})=>{
    if(mode === 'sandbox'){
        baseConfig.build.sourcemap = true
    }
    return baseConfig
})
