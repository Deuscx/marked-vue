<script setup lang="ts">
import type { Tokens } from 'marked'
import BlockRenderNew from './BlockRenderNew'

defineProps<{
  token: Tokens.Em
}>()
</script>

<template>
  <em>
    <BlockRenderNew :tokens="token.tokens" v-bind="$attrs" />
  </em>
</template>
