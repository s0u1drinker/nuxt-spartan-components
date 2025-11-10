# nuxt-spartan-components

Nuxt 4 модуль, который автоматически подключает библиотеку [`vue-spartan-components`](https://www.npmjs.com/package/vue-spartan-components):

- регистрирует все компоненты глобально;
- подключает общие стили.

## Установка

```bash
npm install vue-spartan-components nuxt-spartan-components
```

## Использование

Добавьте модуль в `nuxt.config`:

```ts
export default defineNuxtConfig({
  modules: ["nuxt-spartan-components"],
});
```

После чего можно сразу использовать компоненты библиотеки:

```vue
<template>
  <VscButton>Кнопка</VscButton>
</template>
```
