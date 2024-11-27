export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.hook('app:chunkError', () => {
      window.location.reload()
    })

    nuxtApp.hook('vue:error', (error, instance, info) => {
        window.location.reload()
      })

    nuxtApp.vueApp.config.errorHandler = (error, instance, info) => {
    window.location.reload()
    }
  })