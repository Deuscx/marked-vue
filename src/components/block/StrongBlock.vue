<script setup lang="ts">
import type { Tokens } from 'marked'
import BlockRenderNew from './BlockRenderNew'

defineProps<{
  token: Tokens.Strong
}>()
</script>

<template>
  <strong>
    <BlockRenderNew :tokens="token.tokens" />
  </strong>
</template>

<style scoped>

</style>
