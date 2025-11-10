/**
 * Автоматически определяет все компоненты из vue-spartan-components.
 */
export async function getComponentNames(): Promise<string[]> {
  try {
    // Динамический импорт всех экспортов из библиотеки.
    const componentsModule = await import('vue-spartan-components')

    // Фильтруем компоненты.
    const componentNames = Object.keys(componentsModule).filter(
      name =>
        name.startsWith('Vsc')
        && name !== 'VueSpartanComponents'
        && typeof componentsModule[name as keyof typeof componentsModule] === 'object'
        && componentsModule[name as keyof typeof componentsModule] !== null,
    )

    return componentNames.sort()
  }
  catch {
    // Fallback: возвращаем известные компоненты, если импорт не удался.
    return ['VscButton', 'VscIcon']
  }
}
