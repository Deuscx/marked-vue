<script setup lang="ts">
import type { RendererObject } from 'marked'
import { marked } from 'marked'
import { content } from './data'

let listLevel = 0

const customRenderer: RendererObject = {
  list(token) {
    listLevel++
    const ordered = token.ordered
    const tag = ordered ? 'ol' : 'ul'
    const levelClass = `${tag}-level-${listLevel}`
    let body = ''
    for (let j = 0; j < token.items.length; j++) {
      const item = token.items[j]
      body += this.listitem(item)
    }
    const result = `<${tag} class="${levelClass}">${body}</${tag}>`

    listLevel--
    return result
  },
  table(token): string {
    let header = ''

    // header
    let cell = ''
    for (let j = 0; j < token.header.length; j++) {
      cell += this.tablecell(token.header[j])
    }
    header += this.tablerow({ text: cell })

    let body = ''
    for (let j = 0; j < token.rows.length; j++) {
      const row = token.rows[j]

      cell = ''
      for (let k = 0; k < row.length; k++) {
        cell += this.tablecell(row[k])
      }

      body += this.tablerow({ text: cell })
    }
    if (body)
      body = `<tbody>${body}</tbody>`

    return `<div class="table-container"><table>`
      + `<thead>\n${
        header
      }</thead>\n${
        body
      }</table></div>`
  },
}
// 将自定义渲染器注册到marked
marked.use({ renderer: customRenderer })
function parseMarkdown(content: string) {
  return marked.parse(content)
}

const html = computed(() => parseMarkdown(content))
</script>

<template>
  <div v-html="html" />
</template>

<style scoped>

</style>
