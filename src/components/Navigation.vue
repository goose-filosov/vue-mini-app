<template>
  <nav>
    <v-navigation-drawer
      v-model="drawer"
      app
      class="amber lighten-3 white--text"
    >
      <v-col class="d-flex align-center py-7 flex-column">
        <v-avatar size="164" color="blue lighten-6">
          <v-img src="../assets/shark.png"></v-img>
        </v-avatar>
        <p class="mt-5 headline black--text">{{ name }}</p>
      </v-col>
      <v-divider></v-divider>
      <v-list dense>
        <v-list-item
          link
          v-for="link in links"
          :key="link.title"
          :to="link.route"
        >
          <v-list-item-action>
            <v-icon color="black">mdi-{{ link.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="black--text">
              {{ link.title }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>{{ this.$route.name }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn @click="logout">Выйти</v-btn>
    </v-app-bar>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
      links: [
        { icon: "home", title: "Главная", route: "/home" },
        { icon: "weather-partly-cloudy", title: "Погода", route: "/weather" },
        { icon: "calendar-check", title: "Создать дело", route: "/task" },
        { icon: "pencil-plus", title: "Создать задачу", route: "/todo" }
      ]
    };
  },
  computed: {
    name() {
      return this.$store.getters.info.name;
    }
  },
  methods: {
    async logout() {
      await this.$store.dispatch("logout");
      await this.$router.push("/login?message=logout");
    }
  }
};
</script>
