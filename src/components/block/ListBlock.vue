<script setup lang="ts">
import type { Tokens } from 'marked'

import BlockRender from './BlockRender.vue'

const props = withDefaults(defineProps<{
  token: Tokens.List
  level?: number
}>(), {
  level: 0,
})

const tag = computed(() => props.token.ordered ? 'ol' : 'ul')
</script>

<template>
  <component :is="tag" :class="`${tag}-level-${level}`">
    <BlockRender :tokens="token.items" :level="level + 1" />
  </component>
</template>

<style scoped>

</style>
