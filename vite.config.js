import path from "path"
import {defineConfig} from "vite"
import { createVuePlugin } from 'vite-plugin-vue2'
import WindiCSS from "vite-plugin-windicss"
import usePluginImport from 'vite-plugin-importer'
import legacy from '@vitejs/plugin-legacy'
import viteCompression from 'vite-plugin-compression'
import ScriptSetup from 'unplugin-vue2-script-setup/vite'
import eslintPlugin from "@nabla/vite-plugin-eslint"
import PostcssPxtorem from 'postcss-pxtorem'
import PostcssNested from 'postcss-nested'
import ImageLoader from '@rollup/plugin-image'
import Autoprefixer from 'autoprefixer'

import {version} from './package.json'
export default defineConfig(({command,mode})=>{
    const baseConfig = {
        resolve: {
            alias: {
                "@": path.resolve(__dirname, "src"),
            },
            dedupe: ["vue-demi"],
        },
        build: {
            minify: 'esbuild',
            // assetsDir:'./static',
            sourcemap: false,
            manifest: true
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
            ScriptSetup({ refTransform: true }),
            eslintPlugin({
                shouldLint:(path) => {
                    if(path.indexOf('.vue?')>-1){
                        return false
                    }
                    const realPath = path.split('?')[0]
                    let fileExt = ''
                    if(realPath.indexOf('/.') > -1){
                        fileExt =  realPath.replace(/\/./g,'').split('.')[1]
                    } else {
                        fileExt = realPath.split('.')[1]
                    }
                    // const fileExt = realPath.match(/\.(vue|js?x|ts?x)(\?.*)?$/)
                    const isIgnorePath = ['node_modules','.vite'].every(e=>realPath.indexOf(e) === -1)
                    const allowFileType = ['vue','js','jsx','ts','tsx'].includes(fileExt)
                    return isIgnorePath && allowFileType
                }
            }),
            ImageLoader()
        ],
        css:{
            postcss:{
                plugins: [
                    Autoprefixer({overrideBrowserslist:["> 1%", "last 4 versions", "not dead","iOS >= 11","Android > 4"]}),
                    PostcssPxtorem({rootValue: 100,propList: ['*']}),
                    PostcssNested()
                ]
            }
        },
        server:{
            host:'0.0.0.0',
            port:8080
        },
        define:{
            buildTime: JSON.stringify(new Date().toLocaleString()),
            VITE_APP_VERSION: JSON.stringify(version)
        }
    }
    if(mode === 'sandbox'){
        baseConfig.build.sourcemap = true
    }
    baseConfig.plugins.push(viteCompression())
    return baseConfig
})
