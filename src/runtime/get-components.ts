/**
 * Автоматически определяет имена компонентов из `vue-spartan-components`.
 *
 * Предполагаем соглашение об именовании: все компоненты начинаются с `Vsc`.
 */
export async function getComponentNames(): Promise<string[]> {
  try {
    const componentsModule = await import('vue-spartan-components')

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
    // Если по какой-то причине импорт недоступен, возвращаем список компонентов.
    return [
      'VscButton',
      'VscIcon',
      'VscButton',
      'VscIcon',
      'VscInput',
      'VscInputText',
      'VscInputPassword',
      'VscLabel',
      'VscMessage',
      'VscRating',
    ]
  }
}
