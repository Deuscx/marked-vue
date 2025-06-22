<script setup lang="ts">
import type { Tokens } from 'marked'

defineOptions({
  inheritAttrs: false,
})

defineProps<{
  token: Tokens.ListItem
}>()
</script>

<template>
  <li>
    <BlockRender :tokens="token.tokens" v-bind="$attrs" />
  </li>
</template>

<style scoped>

</style>
