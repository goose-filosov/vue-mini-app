<template>
  <v-container class="fill-height auth-layout" fluid>
    <v-row align="center" justify="center">
      <transition name="component-fade" mode="out-in">
        <router-view />
      </transition>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "AuthLayout",
  data: () => ({
    snackbar: false,
    text: "My timeout is set to 2000.",
    timeout: 800
  })
};
</script>

<style lang="scss" scoped>
.home-link {
  text-decoration: none;
}
.component-fade-enter-active,
.component-fade-leave-active {
  transition: opacity 0.3s ease;
}
.component-fade-enter,
.component-fade-leave-to {
  opacity: 0;
}
</style>
