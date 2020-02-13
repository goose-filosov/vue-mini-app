<template>
  <div class="task">
    <!-- Create task button-->
    <div class="head mt-6">
      <div class="create-task ml-auto">
        <v-btn @click="overlay = true" class="mx-2" fab dark color="indigo">
          <v-icon dark>mdi-plus</v-icon>
        </v-btn>
      </div>
    </div>
    <!-- /Create task button-->
    <v-container class="mt-5">
      <Preloader v-if="preloader" />
      <v-row v-else>
        <TaskCard
          v-for="(task, i) in taskArray"
          :key="i"
          :task="task"
          @emit-delete-task="deleteTaskInArray"
        />
      </v-row>
    </v-container>
    <!-- Call datepicker-->
    <v-overlay :value="overlay" :opacity="opacity" class="data-overlay">
      <div class="overlay">
        <div class="text-fields">
          <v-text-field
            label="Заголовок задачи"
            outlined
            v-model="taskTitle"
            full-width
          ></v-text-field>
          <v-textarea
            outlined
            name="input-7-4"
            label="Описание задачи"
            v-model="taskDescription"
            full-width
          ></v-textarea>
        </div>
      </div>
      <v-btn
        color="purple lighten-3"
        @click="datePickerOverlay = true"
        width="100%"
      >
        Выбрать дату
      </v-btn>
      <v-btn color="green" @click="createTask" width="100%" class="mt-4">
        Создать таску
      </v-btn>
      <v-btn color="red" @click="overlay = false" width="100%" class="mt-4">
        Закрыть
      </v-btn>
      <v-overlay
        :value="datePickerOverlay"
        :opacity="pickerOpacity"
        class="picker-overlay"
      >
        <v-date-picker
          v-model="picker"
          @click:date="datePickerOverlay = false"
        ></v-date-picker>
      </v-overlay>
    </v-overlay>
    <!-- /Call datepicker-->
  </div>
</template>

<script>
import moment from "moment";
import TaskCard from "../components/TaskCard";

export default {
  components: {
    TaskCard
  },
  data: () => ({
    taskArray: [],
    picker: "",
    taskTitle: "",
    taskDescription: "",
    taskStatus: "",
    overlay: false,
    opacity: 1,
    datePickerOverlay: false,
    pickerOpacity: 0.8,
    preloader: true
  }),
  computed: {
    changeDate() {
      moment.locale("ru");
      return moment(this.picker).format("ll");
    }
  },
  methods: {
    deleteTaskInArray(id) {
      this.taskArray = this.taskArray.filter(t => t.id !== id);
    },
    async createTask() {
      if (
        this.taskTitle.trim().length > 0 &&
        this.taskDescription.trim().length > 0 &&
        this.picker.trim().length > 0
      ) {
        const task = await this.$store.dispatch("addTask", {
          title: this.taskTitle,
          description: this.taskDescription,
          date: this.changeDate,
          status: "в исполнении"
        });
        this.taskArray.push(task);
        this.taskTitle = "";
        this.taskDescription = "";
        this.picker = "";
        this.overlay = false;
      }
    }
  },
  async mounted() {
    this.taskArray = await this.$store.dispatch("fetchTasks");
    this.preloader = false;
  }
};
</script>

<style lang="scss" scoped>
.picker-overlay {
  transition: all 1s;
}
.data-overlay {
  transition: all 0.4s;
}
</style>
