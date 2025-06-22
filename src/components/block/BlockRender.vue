<script setup lang="ts">
import type { TokensList } from 'marked'

defineProps<{
  tokens: TokensList
}>()
</script>

<template>
  <MarkedParse v-for="(token, index) in tokens" :key="index" v-memo="[token.raw]" :token="token" :index="index" />
  <!-- <component :is="blocks[token.type]" v-for="(token, index) in tokens" :key="index" :token="token" v-bind="$attrs" /> -->
</template>

<style>

</style>
