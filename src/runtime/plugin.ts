import { defineNuxtPlugin } from '#app'
import { VueSpartanComponents } from 'vue-spartan-components'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VueSpartanComponents)
})
