<template>
  <v-col cols="12" md="4">
    <v-card
      class="card-border-progress"
      :class="{ cardBorderComplete: task.status === 'выполнено' }"
      :ripple="false"
    >
      <v-card-title>
        {{ task.title }}
        <v-spacer></v-spacer>
        <v-icon color="red" @click="deleteTask(task.id)"
          >mdi-close-circle</v-icon
        >
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>{{ task.description }}</v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <span class="ml-2">{{ task.date }}</span>
        <v-spacer></v-spacer>
        <span
          @click="changeTaskStatus(task)"
          class="amber--text lighten-3 mr-2 pointer"
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
  border: 1px solid #ffca28;
}
.cardBorderComplete {
  border: 1px solid yellowgreen;
}
.pointer {
  cursor: pointer;
}
</style>
