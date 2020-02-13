<template>
  <v-col cols="12" sm="8" md="4" class="ml-6 ml-sm-0">
    <v-card class="elevation-12">
      <v-toolbar color="purple lighten-3" light flat>
        <router-link to="/" tag="span">
          <v-icon class="link-decoration" color="white"
            >mdi-arrow-left-bold-box</v-icon
          >
        </router-link>
        <v-spacer />
        <v-toolbar-title class="white--text">Регистрация</v-toolbar-title>
        <v-spacer />
        <router-link to="/login" class="white--text">Войти</router-link>
      </v-toolbar>
      <v-card-text>
        <v-form>
          <v-text-field
            label="E-mail"
            name="login"
            type="text"
            v-model.trim="email"
            :error-messages="emailErrors"
          />
          <v-text-field
            label="Имя"
            name="name"
            type="text"
            v-model="name"
            :error-messages="nameErrors"
          />
          <v-text-field
            id="password"
            label="Пароль"
            name="password"
            type="password"
            v-model="password"
            :error-messages="passwordErrors"
          />
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn
          color="purple lighten-3 white--text"
          width="100%"
          light
          large
          @click="submitHandler"
          >Зарегистрироваться</v-btn
        >
        <v-snackbar
          v-model="snackbar"
          :timeout="timeout"
          color="red lighten-2"
          top
        >
          {{ error }}
        </v-snackbar>
      </v-card-actions>
    </v-card>
  </v-col>
</template>

<script>
import { email, minLength, required } from "vuelidate/lib/validators";

export default {
  name: "Register",
  data() {
    return {
      email: "",
      password: "",
      name: "",
      snackbar: false,
      timeout: 2000,
      error: ""
    };
  },
  validations: {
    email: { email, required },
    password: { required, minLength: minLength(6) },
    name: { required }
  },
  computed: {
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email && errors.push("Введите корректный E-mail");
      !this.$v.email.required &&
        this.$v.email.$dirty &&
        errors.push("Поле не должно быть пустым");
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.minLength &&
        this.$v.password.$dirty &&
        errors.push(
          `Пароль должен быть длиннее ${this.$v.password.$params.minLength.min}-и символов. Сейчас ${this.password.length}`
        );
      !this.$v.password.required &&
        this.$v.password.$dirty &&
        errors.push("Поле не должно быть пустым");
      return errors;
    },
    nameErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.name.required &&
        this.$v.name.$dirty &&
        errors.push("Поле не должно быть пустым");
      return errors;
    }
  },
  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      const formData = {
        email: this.email,
        password: this.password,
        name: this.name
      };
      try {
        await this.$store.dispatch("register", formData);
        alert("Register success");
        await this.$router.push("/home");
      } catch (e) {
        if (e.code === "auth/email-already-in-use") {
          this.error = "E-mail уже занят!";
          this.email = "";
        }
      }
      this.snackbar = true;
    }
  }
};
</script>

<style scoped>
.link-decoration {
  text-decoration: none;
}
</style>
