# Vite-Vue2-Project
这是一个过渡模板，在vue2的基础上尽量支持vue3的语法，以便以后可以实现平滑升级。

# 由于vite-vue2插件的不稳定性，不建议生产环境使用

## 使用前
请先了解如下内容：
+ [vue3文档](https://v3.cn.vuejs.org/)
+ [vite配置文档](https://cn.vitejs.dev/config/)
+ [@vue/composition-api](https://github.com/vuejs/composition-api)
+ [windiCss]( https://windicss.org/utilities/typography.html)
+ [Vue-Use](https://vueuse.org/)
+ [vuex-composition-helpers](https://github.com/greenpress/vuex-composition-helpers)
## 支持的语法
+ script setup

可以在script标签上加上setup,直接使用vue3相关语法，须配合[@vue/composition-api](https://github.com/vuejs/composition-api)使用，例如
```javascript
<script setup>
    import { ref,onMounted } from '@vue/composition-api'
    const a = ref('123')
    onMounted(()=>{
        console.log('component did mount')
    })
</script>

```
+ vue-router和vuex仍使用了旧版本，api不变

+ 引入vant等组件库时自动引入样式，基于vite-plugin-importer

+ 配置有常用的环境变量

   如果是常量，建议在vite.config.js中baseConfig.define中配置。
   如果是变量，则在相应的.env文件中定义[参见文档](https://cn.vitejs.dev/guide/env-and-mode.html#env-files)
  
 + 自动转换px为rem

    配置参考vite.config.js中baseConfig.css.postcss.plugin
+ Atom css lib
 使用了windiCss，基本类似与TailwindCss
 参见 https://windicss.org/utilities/typography.html
+ 增加vueUse，里面有大量工具函数
## 不支持的语法

+ vue3中template无需一个根节点，vue2仍需要
+ 不支持top level await,仍需要使用async await
+ 不支持ref surge，例如ref:xxx
+ 其他不被@vue/composition-api 支持的语法

## TODO
- [x] 解决打包后index.html乱码
- [ ] 打包完成后自动压缩为zip包
