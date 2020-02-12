import Vue from "vue";
import Vuex from "vuex";
import todo from "./modules/todo";
import task from "./modules/task";
import weather from "./modules/weather";
import auth from "./modules/auth";
import info from "./modules/info";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    todo,
    task,
    weather,
    auth,
    info
  }
});
