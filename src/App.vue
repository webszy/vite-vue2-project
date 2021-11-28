<template>
    <router-view />
</template>
<script setup>
import { isIphonex } from '@/utils'

    window._env = _env
    if(_env.isSandbox && _env.isServe){
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
</script>

