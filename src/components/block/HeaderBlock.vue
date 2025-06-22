<script setup lang="ts">
import type { Tokens } from 'marked'

defineProps<{
  token: Tokens.Heading
}>()
</script>

<template>
  <component :is="`h${token.depth}`">
    {{ token.text }}
  </component>
</template>

<style scoped>

</style>
