<script setup lang="ts">
import type { TokensList } from 'marked'

defineProps<{
  tokens: TokensList[]
}>()
</script>

<template>
  <MarkedParse v-for="(token, index) in tokens" :key="index" :token="token" :index="index" :total="tokens.length" />
  <!-- <component :is="blocks[token.type]" v-for="(token, index) in tokens" :key="index" :token="token" v-bind="$attrs" /> -->
</template>

<style>

</style>
