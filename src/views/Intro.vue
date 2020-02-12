<template>
  <v-container>
    <h1 class="text-center">Hola, Vue!!!!</h1>
    <v-row class="mt-12">
      <v-col cols="12" md="4" offset-md="4" class="mt-12 d-flex justify-center">
        <v-btn @click="goToLogin">Login</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Intro",
  methods: {
    goToLogin() {
      this.$router.push("/login");
    }
  }
};
</script>

<style scoped></style>
