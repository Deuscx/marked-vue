<script setup lang="ts">
import rehypeRaw from 'rehype-raw'
import rehypeStringify from 'rehype-stringify'
import remarkGfm from 'remark-gfm'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import { unified } from 'unified'
import { visit } from 'unist-util-visit'

const props = defineProps<{
  content: string
}>()

const processor = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkRehype, { allowDangerousHtml: true })
  .use(rehypeRaw)
  .use(customRehypePlugin)
  .use(rehypeStringify)
const jr = new Set(['code', 'script', 'style', 'table', 'tbody', 'tr', 'td'])
function customRehypePlugin() {
  return (tree: any) => {
    let targetNode: any = null
    let textNode = null
    visit(tree, 'text', (node, index, parent) => {
    //   let properties

      // 检查节点是否有效
      if (parent
        && node.value.trim() !== ''
        && node.value !== '\n') {
        textNode = node

        // 检查父节点是否是特定类型的元素或带有特定属性的a标签
        if ((parent.type === 'element' && !jr.has(parent.tagName))
          || (parent.type === 'element'
        // && parent.tagName === 'a'
        // && (properties = parent.properties)
        // && properties.href === '@ref'
          )
        ) {
          targetNode = {
            node,
            index,
            parent,
          }
        }
      }
    })

    // 如果找到目标节点且与文本节点匹配，则处理文本
    if (targetNode && targetNode.node === textNode) {
      // 将文本分割为字符数组
      const characters = targetNode.node.value.split('') as string[]

      // 计算分割点，保留最后6个字符
      const splitIndex = characters.length > 6
        ? characters.length - 6
        : 0

      // 创建普通文本节点
      const firstPartNode = {
        type: 'text',
        value: characters.slice(0, splitIndex).join(''),
      }

      // 创建渐变效果的span元素
      const gradientSpanNodes = characters.slice(splitIndex).map((char, position) => {
        // 每个字符的透明度从0.6递减到0.1
        const opacity = 0.1 * (6 - position)

        return {
          type: 'element',
          tagName: 'span',
          properties: {
            'data-gradient': 'true',
            'style': `opacity: ${opacity};`,
            'className': '',
          },
          children: [{
            type: 'text',
            value: char,
          }],
        }
      })

      // 替换原文本节点
      const parentChildren = targetNode.parent.children
      parentChildren.splice(targetNode.index, 1, firstPartNode, ...gradientSpanNodes)
    }
  }
}

const html = computed(() => {
  return String(processor.processSync(props.content))
})
</script>

<template>
  <div v-html="html" />
</template>

<style scoped>

</style>
