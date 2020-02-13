<template>
  <div class="todo">
    <v-container fluid>
      <h2 class="text-center mt-md-4 mb-md-12 head-title">Задачи на день</h2>

      <v-row>
        <v-col md="3" class="d-none d-md-block">
          <v-img
            src="../assets/travel-tickets-colour.svg"
            max-width="85%"
            class="mx-auto"
          ></v-img>
        </v-col>
        <v-col md="6" class="mt-6 mt-md-0">
          <v-row>
            <v-col cols="12" sm="8" md="5" offset-md="2">
              <v-text-field
                label="Запишите задачу сюда"
                outlined
                v-model="title"
                @keyup.enter="createTodo"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="4" class="d-md-none">
              <v-btn
                @click="createTodo"
                class="button-create"
                width="100%"
                color="green lighten-3 black--text"
                depressed
                >Создать</v-btn
              >
            </v-col>
            <v-col cols="12" md="3" offset-md="0">
              <v-select
                v-model="filter"
                :items="items"
                label="Фильтр"
                outlined
              ></v-select>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="10" offset-sm="1" md="8" offset-md="2">
              <v-progress-linear
                v-model="progress"
                height="25"
                reactive
                color="green lighten-3"
              >
                <strong>{{ Math.ceil(progress) || "0" }}%</strong>
              </v-progress-linear>
            </v-col>
          </v-row>
          <v-row>
            <v-col
              cols="12"
              sm="10"
              offset-sm="1"
              md="8"
              offset-md="2"
              class="todo-wrapper"
            >
              <transition-group
                tag="div"
                name="list-complete"
                class="todo-wrapper"
              >
                <TodoCard
                  v-for="todo in todoList"
                  :key="todo.id"
                  :todo="todo"
                  @emit-delete-todo="deleteTodo"
                />
              </transition-group>
            </v-col>
          </v-row>
        </v-col>

        <v-col md="3" class="d-none d-lg-block">
          <v-img
            src="../assets/app-user-colour.svg"
            max-width="80%"
            class="mx-auto guy-img"
          ></v-img>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import TodoCard from "../components/TodoCard";

export default {
  components: {
    TodoCard
  },
  data() {
    return {
      todoArray: [],
      title: "",
      items: ["Все", "Выполненные", "Не выполненные"],
      filter: "Все",
      cacheTitle: ""
    };
  },
  computed: {
    todoList() {
      if (this.filter === "Все") {
        return this.todoArray;
      } else if (this.filter === "Выполненные") {
        return this.todoArray.filter(t => t.done);
      } else {
        return this.todoArray.filter(t => !t.done);
      }
    },
    progress() {
      return (
        (this.todoArray.filter(t => t.done).length / this.todoArray.length) *
        100
      );
    }
  },
  methods: {
    async createTodo() {
      if (this.title.trim().length > 0) {
        const todo = await this.$store.dispatch("addTodo", {
          title: this.title,
          done: false,
          change: false
        });

        this.todoArray.push(todo);
        this.cacheTitle = this.title;
        this.title = "";
      }
    },
    deleteTodo(id) {
      this.todoArray = this.todoArray.filter(t => t.id !== id);
    }
  },
  async mounted() {
    this.todoArray = await this.$store.dispatch("fetchTodo");
  }
};
</script>

<style lang="scss" scoped>
.guy-img {
  margin-top: 300px;
}

.head-title {
  font-size: 34px;
}
.button-create {
  height: 100%;
  @media (max-width: 556px) {
    height: 40px;
  }
}

.list-complete {
  &-enter {
    opacity: 0;
    transform: translateX(-50px);
  }

  &-leave {
    &-to {
      opacity: 0;
      transform: translateX(50px);
    }
  }
}
</style>
