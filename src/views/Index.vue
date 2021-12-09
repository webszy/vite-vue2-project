<template>
  <div class="w-full h-full flex flex-col justify-center items-center">
    <p class="text-center">Index</p>
    <img :src="logo">
    <van-button type="warning">{{ a }}</van-button>
  </div>
</template>

<script setup>
import {Button as VanButton} from 'vant'
import {ref,onMounted} from '@vue/composition-api'
import logo from '~/assets/favicon.svg'
const a = ref(123)
onMounted(()=>{
  console.log('component did mount')
})

</script>

<style scoped>
p{font-size:20px;}
img{
  width:30%;
}
</style>
