<template>
  <div class="main-layout">
    <Navigation />
    <v-content class="mx-4 my-4">
      <transition name="component-fade" mode="out-in">
        <router-view />
      </transition>
    </v-content>
  </div>
</template>

<script>
import Navigation from "../components/Navigation";

export default {
  name: "MainLayout",
  components: {
    Navigation
  },
  async mounted() {
    if (!Object.keys(this.$store.getters.info).length) {
      await this.$store.dispatch("fetchInfo");
    }
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
