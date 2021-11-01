<template>
  <div class="w-full h-full">
    Index
    <van-button type="warning">{{ a }}</van-button>
  </div>
</template>

<script setup>
import {Button as VanButton} from 'vant'
import {ref,onMounted} from '@vue/composition-api'
const a = ref(123)
onMounted(()=>{
  console.log('component did mount')
})

</script>

<style scoped>

</style>
