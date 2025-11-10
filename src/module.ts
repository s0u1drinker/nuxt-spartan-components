import { defineNuxtModule, addPlugin, addTypeTemplate, createResolver } from '@nuxt/kit'
import { getComponentNames } from './runtime/get-components'

export type ModuleOptions = Record<string, never>

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-spartan-components',
    configKey: 'spartanComponents',
    compatibility: {
      nuxt: '^4.0.0',
    },
  },
  defaults: {},
  async setup(_options, nuxt) {
    const resolver = createResolver(import.meta.url)
    const CSSpath = 'vue-spartan-components/styles.css'
    const componentName = 'vue-spartan-components'

    nuxt.options.css ||= []

    if (!nuxt.options.css.includes(CSSpath)) {
      nuxt.options.css.push(CSSpath)
    }

    if (!Array.isArray(nuxt.options.build.transpile)) {
      nuxt.options.build.transpile = []
    }

    const transpile = nuxt.options.build.transpile

    if (!transpile.includes(componentName)) {
      transpile.push(componentName)
    }

    // Автоматически определяем все компоненты из библиотеки.
    const componentNames = await getComponentNames()

    // Генерируем импорты для всех компонентов.
    const imports = componentNames.map(name => name).join(', ')

    // Теперь типы.
    const typeDefinitions = componentNames
      .map(name => `    ${name}: typeof ${name}`)
      .join('\n')

    addTypeTemplate({
      filename: 'nuxt-spartan-components.d.ts',
      getContents: () => `import type { ${imports} } from 'vue-spartan-components'

declare module 'vue' {
  interface GlobalComponents {
${typeDefinitions}
  }
}

export {}
`,
    })

    addPlugin(resolver.resolve('./runtime/plugin'))
  },
})
