import type { TokensList } from 'marked'
import EmBlock from './EmBlock.vue'
import HeaderBlock from './HeaderBlock.vue'
import LinkBlock from './LinkBlock.vue'
import ListBlock from './ListBlock.vue'
import ListItemBlock from './ListItemBlock.vue'
import ParagraphBlock from './ParagraphBlock.vue'
import StrongBlock from './StrongBlock.vue'
import TextBlock from './TextBlock.vue'

// 定义块级组件映射
const blockComponents = {
  heading: HeaderBlock,
  list: ListBlock,
  list_item: ListItemBlock,
  text: TextBlock,
  paragraph: ParagraphBlock,
  strong: StrongBlock,
  em: EmBlock,
  link: LinkBlock,
} as const

export default defineComponent({
  name: 'BlockRenderNew',
  props: {
    tokens: {
      type: Object as PropType<TokensList>,
      required: true,
    },
  },
  setup(props, { attrs }) {
    // 解析HTML标签名
    const parseTagName = (html: string): string => {
      const tagMatch = html.match(/^<([a-z0-9-]+)/i)
      return tagMatch ? tagMatch[1] : ''
    }

    // 渲染函数
    const renderBlocks = (tokens: TokensList, attrs: any) => {
      const vnodes: any[] = []
      let currentHtmlContext: { tag: string, children: any[] } | null = null

      for (let i = 0; i < tokens.length; i++) {
        const token = tokens[i]

        // 处理HTML标签
        if (token.type === 'html') {
          // 开始新的HTML标签上下文
          if (!currentHtmlContext) {
            const tagName = parseTagName(token.text)
            if (tagName) {
              currentHtmlContext = { tag: tagName, children: [] }
            }
            continue
          }
          // 结束当前HTML标签上下文
          else {
            vnodes.push(h(currentHtmlContext.tag, {
              key: `html-${i}`,
              ...attrs,
            }, currentHtmlContext.children))
            currentHtmlContext = null
            continue
          }
        }

        // 处理普通块级组件
        const Component = blockComponents[token.type as keyof typeof blockComponents]
        if (!Component)
          continue
        const vnode = h(Component, {
          key: `${token.type}-${i}`,
          token,
          ...attrs,
        })

        // 添加到HTML标签上下文或直接添加到结果中
        if (currentHtmlContext) {
          currentHtmlContext.children.push(vnode)
        }
        else {
          vnodes.push(vnode)
        }
      }

      // 处理未闭合的HTML标签
      if (currentHtmlContext) {
        console.warn('未闭合的HTML标签:', currentHtmlContext.tag)
        vnodes.push(h(currentHtmlContext.tag, {
          key: `html-unclosed-${tokens.length}`,
          ...attrs,
        }, currentHtmlContext.children))
      }

      return vnodes
    }

    return () => renderBlocks(props.tokens, attrs)
  },

})
