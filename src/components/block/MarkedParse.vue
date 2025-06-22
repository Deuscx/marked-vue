<script setup lang="ts">
import type { Token } from 'marked'
import { marked } from 'marked'

const props = defineProps<{
  token: Token
  index: number
  total: number
}>()

// 最后两行
const html = computed(() => {
  const content = marked.parser([props.token])
  return content
})
</script>

<template>
  <p v-html="html" />
</template>

<style>
/* 定义文字渐显动画 */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(5px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
/* 应用于末尾5个字符的动画 */
.char {
  animation: fadeIn 700ms ease-out forwards;
  display: inline-block;
}
</style>
