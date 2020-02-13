import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import Vuelidate from "vuelidate";
import Preloader from "./components/Preloader";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

Vue.config.productionTip = false;
Vue.use(Vuelidate);
Vue.component("Preloader", Preloader);

// Initialize Firebase
firebase.initializeApp({
  apiKey: process.env.VUE_APP_FIREBASE,
  authDomain: "mini-vue-app.firebaseapp.com",
  databaseURL: "https://mini-vue-app.firebaseio.com",
  projectId: "mini-vue-app",
  storageBucket: "mini-vue-app.appspot.com",
  messagingSenderId: "857936819322",
  appId: "1:857936819322:web:67ab251cd08be6517cb7c3",
  measurementId: "G-Z797DTLHHB"
});

let app;

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      vuetify,
      render: h => h(App)
    }).$mount("#app");
  }
});
