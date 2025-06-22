<script setup lang="ts">
import type { Tokens } from 'marked'

defineOptions({
  inheritAttrs: false,
})

defineProps<{
  token: Tokens.Text
}>()
</script>

<template>
  {{ token.text }}
</template>

<style scoped>

</style>
