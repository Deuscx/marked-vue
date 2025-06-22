<script setup lang="ts">
import type { Tokens } from 'marked'
// import BlockRenderNew from './BlockRenderNew';

defineProps<{
  token: Tokens.Paragraph
}>()
</script>

<template>
  <p>
    <BlockRenderNew :tokens="token.tokens" v-bind="$attrs" />
  </p>
</template>
