<!-- eslint-disable unused-imports/no-unused-vars -->
<!-- eslint-disable no-console -->
<script setup lang="ts">
import type { RendererObject, Token } from 'marked'
import { marked } from 'marked'
// import BlockRenderNew from './block/BlockRenderNew.ts'
import { content } from './data'

let listLevel = 0
const md = ref('')
const chunks = content.split('')
const { pause } = useIntervalFn(() => {
  if (!chunks.length)
    return pause()
  md.value += chunks.shift()
}, 20)

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

function walkTokens(token: Token) {
  // TODO: 需要优化
  const subs = token.tokens || token.items
  if (subs) {
    const start = (token._start || 0)
    let subpos = 0
    subs.forEach((sub) => {
      const substart = token.raw.indexOf(sub.raw, subpos)
      const sublen = sub.raw.length
      sub._start = substart + start
      sub._end = sub._start + sublen
      subpos = substart + sublen
    })
  }
}
// 将自定义渲染器注册到marked
marked.use({ renderer: customRenderer })
// marked.use({ walkTokens })
function parseMarkdown(content: string) {
  console.time('marked')
  const tokens = marked.lexer(content)
  marked.walkTokens(tokens, walkTokens)
  const html = marked.parser(tokens)
  // const html = marked.parse(content)
  console.timeEnd('marked')
  return html
}
function getTokens(content: string) {
  const tokens = marked.lexer(content, {
    gfm: true,
  })
  return tokens
}

const tokens = computed(() => getTokens(content))
const html = computed(() => parseMarkdown(content))
</script>

<template>
  <div v-html="html" />
  <div class="grid grid-cols-2 gap-4">
    <div>
      <!-- <BlockRender :tokens="tokens" /> -->

      <!-- <BlockRenderNew :tokens="tokens" /> -->
    </div>
    <!-- <RemarkMarkdown :content="md" /> -->
  </div>
</template>

<style scoped>

</style>
