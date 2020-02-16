<template>
  <v-col cols="12" md="4">
    <v-card
            @click="changeTaskStatus(task)"
            class="card-border-progress"
      :class="{ cardBorderComplete: task.status === 'выполнено' }"
      :ripple="false"
    >
      <v-card-title>
        {{ task.title }}
        <v-spacer></v-spacer>
        <v-btn  @click.stop="deleteTask(task.id)" color="red">
          <v-icon color="white">mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>{{ task.description }}</v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <span class="ml-2">{{ task.date }}</span>
        <v-spacer></v-spacer>
        <span
          class="amber--text lighten-3 mr-2"
          :class="{ taskComplete: task.status === 'выполнено' }"
          >{{ task.status }}</span
        >
      </v-card-actions>
    </v-card>
  </v-col>
</template>

<script>
export default {
  name: "TaskCard",
  props: {
    task: Object
  },
  methods: {
    async deleteTask(id) {
      this.$emit("emit-delete-task", id);
      await this.$store.dispatch("deleteTaskFromDB", id);
    },
    async changeTaskStatus(task) {
      if (task.status === "в исполнении") {
        task.status = "выполнено";
        await this.$store.dispatch("changeTaskStatus", {
          id: task.id,
          status: task.status
        });
      } else {
        task.status = "в исполнении";
        await this.$store.dispatch("changeTaskStatus", {
          id: task.id,
          status: task.status
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.taskComplete {
  color: yellowgreen !important;
}
.card-border-progress {
  border: 3px solid #FBC108;
}
.cardBorderComplete {
  border: 3px solid yellowgreen;
}
</style>
