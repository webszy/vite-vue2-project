<template>
    <router-view />
</template>
<script>
import { isIphonex } from '@/utils'
export default {
  name:'BaseLine3',
  // components:{
  //  [Notify.Component.name]: Notify.Component,
  // },
  data(){
    return {

    }
  },
  created(){
    window._env = {
      buildTime:window.buildTime,
      appENV: import.meta.env.MODE,
      version:window.VITE_APP_VERSION
    }
    if(import.meta.env.VITE_APP_ENV === 'sandbox' && import.meta.env.MODE === 'production'){
      const s = document.createElement('script')
      s.src = 'https://cdn.jsdelivr.net/npm/vconsole@3.9.4/dist/vconsole.min.js'
      document.body.appendChild(s)
      s.onload = function () {
        new window.VConsole()
      }
    }
    // 当顶部是刘海屏时
    const iphonex = isIphonex()
    //顶部47，顶部34
    if(iphonex){
      document.body.style.setProperty('--safe-top','.4rem')
      document.body.style.setProperty('--safe-bottom','.34rem')
    } else {
      document.body.style.setProperty('--safe-top','10px')
      document.body.style.setProperty('--safe-bottom','10px')
    }
  }
}
</script>

