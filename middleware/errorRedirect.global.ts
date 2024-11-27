export default defineNuxtRouteMiddleware((to, from) => {
    const { error } = useNuxtApp();
  
    if (error) {
  
      return navigateTo('/');
    }
  });
  