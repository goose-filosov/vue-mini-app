<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" md="6" class="d-flex flex-column align-center">
        <h1 class="text-center intro-title">
          Добро пожаловать в WEB ежедневник
        </h1>
        <div class="d-flex flex-column text-center list">
          <p>
            <v-icon class="mr-2">mdi-check-circle-outline</v-icon
            ><span>Просматривайте погоду</span>
          </p>
          <p>
            <v-icon class="mr-2">mdi-check-circle-outline</v-icon
            ><span>Создавайте дела на день</span>
          </p>
          <p>
            <v-icon class="mr-2">mdi-check-circle-outline</v-icon
            ><span>Создавайте задачи с датой выполнения</span>
          </p>
        </div>
        <div class="actions">
          <v-btn to="/login" class="mr-12 actions__button login elevation-4"
            >Войти</v-btn
          >
          <v-btn
            to="/register"
            class="actions__button register elevation-4"
            color="purple lighten-3"
            >Зарегистрироваться</v-btn
          >
        </div>
      </v-col>
      <v-col cols="12" md="6" class="d-none d-md-block">
        <v-img src="@/assets/undraw_task_31wc.svg"></v-img>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Intro",
  methods: {}
};
</script>

<style lang="scss" scoped>
.container {
  height: 100vh;
  display: flex;
  align-items: center;
}
.intro-title {
  font-size: 40px;
  @media (max-width: 556px) {
    font-size: 26px;
  }
}
.list {
  font-size: 20px;
  margin-top: 150px;
  @media (max-width: 556px) {
    font-size: 14px;
    margin-top: 50px;
  }
}
.actions {
  margin-top: 150px;
  @media (max-width: 556px) {
    margin-top: 50px;
  }
  &__button {
    @media (max-width: 556px) {
      width: 100%;
    }
  }
  .register {
    @media (max-width: 556px) {
      margin-top: 20px;
    }
  }
  .login {
    width: 215px;
    @media (max-width: 556px) {
      width: 100%;
    }
  }
}
</style>
