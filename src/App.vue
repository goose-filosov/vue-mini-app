<template>
  <v-app>
    <transition name="component-fade" mode="out-in">
      <component :is="layout"> </component>
    </transition>
  </v-app>
</template>

<script>
import AuthLayout from "./layouts/AuthLayout";
import MainLayout from "./layouts/MainLayout";
import IntroLayout from "./layouts/IntroLayout";
export default {
  computed: {
    layout() {
      return (this.$route.meta.layout || "auth") + "-layout";
    }
  },
  components: {
    AuthLayout,
    MainLayout,
    IntroLayout
  },
  mounted() {
    this.$vuetify.theme.dark = true;
  }
};
</script>
<style lang="scss" scoped>
.component-fade-enter-active,
.component-fade-leave-active {
  transition: opacity 0.3s ease;
}
.component-fade-enter,
.component-fade-leave-to {
  opacity: 0;
}
</style>
