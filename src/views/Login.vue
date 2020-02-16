<template>
  <v-col cols="12" sm="8" md="4" class="ml-6 ml-sm-0">
    <v-form lazy-validation>
      <v-card class="elevation-12">
        <v-toolbar color="purple lighten-3 white--text" light flat>
          <router-link to="/" tag="span">
            <v-icon color="white">mdi-arrow-left-bold-box</v-icon>
          </router-link>
          <v-spacer />
          <v-toolbar-title>Войти</v-toolbar-title>
          <v-spacer />
          <router-link to="/register" class="white--text"
            >Регистрация</router-link
          >
        </v-toolbar>
        <v-card-text>
          <v-form>
            <v-text-field
              label="E-mail"
              name="login"
              type="text"
              v-model="email"
              :error-messages="emailErrors"
              full-width
            />

            <v-text-field
              id="password"
              label="Пароль"
              name="password"
              type="password"
              v-model="password"
              :error-messages="passwordErrors"
              full-width
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
            >Войти</v-btn
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
    </v-form>
  </v-col>
</template>

<script>
import { email, required, minLength } from "vuelidate/lib/validators";
export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
      snackbar: false,
      timeout: 2000,
      error: ""
    };
  },
  validations: {
    email: { email, required },
    password: { required, minLength: minLength(6) }
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
        password: this.password
      };
      try {
        await this.$store.dispatch("login", formData);
        await this.$router.push("/home");
      } catch (e) {
        if (e.code === "auth/user-not-found") {
          this.error = "Такого пользователя не существует!";
          this.email = "";
          this.password = "";
        } else if (e.code === "auth/wrong-password") {
          this.error = "Неверный пароль!";
          this.password = "";
        }
      }
      this.snackbar = true;
    }
  }
};
</script>