<script setup lang="ts">
import type { Tokens } from 'marked'

defineProps<{
  token: Tokens.Link
}>()
</script>

<template>
  <a :href="token.href" :title="token.title || ''">
    {{ token.text }}
  </a>
</template>

<style scoped>

</style>
