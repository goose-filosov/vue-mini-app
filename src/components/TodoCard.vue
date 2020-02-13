<template>
  <div class="todo purple lighten-3 mt-3 list-complete-item">
    <div class="todo-space d-flex justify-space-between">
      <div class="todo-inner d-flex align-center ml-3 ml-md-5">
        <label class="toggleButton" @click.prevent="changeStatus(todo)">
          <input type="checkbox" :checked="todo.done" />
          <div>
            <svg viewBox="0 0 44 44">
              <path
                d="M14,24 L21,31 L39.7428882,11.5937758 C35.2809627,6.53125861 30.0333333,4 24,4 C12.95,4 4,12.95 4,24 C4,35.05 12.95,44 24,44 C35.05,44 44,35.05 44,24 C44,19.3 42.5809627,15.1645919 39.7428882,11.5937758"
                transform="translate(-2.000000, -2.000000)"
              ></path>
            </svg>
          </div>
        </label>
        <p
          class="my-auto ml-3 white--text card-title"
          :class="{ lineThrough: todo.done }"
          v-if="!todo.change"
        >
          {{ todo.title }}
        </p>
        <input
          type="text"
          class="ml-2 change-todo font-italic font-weight-light"
          v-model="todo.title"
          @keyup.enter="sendEditTodo(todo)"
          @keyup.esc="returnTodoTitle(todo)"
          v-else
        />
      </div>
      <div class="todo-action d-flex align-center mr-1 mr-md-3">
        <v-btn
          fab
          depressed
          color="red lighten-2 white--text"
          class="mr-2 todo-button"
          @click="editTodo(todo)"
        >
          <v-icon>mdi-pencil-box-multiple</v-icon>
        </v-btn>
        <v-btn
          fab
          depressed
          color="red lighten-2 white--text"
          class="todo-button"
          @click="deleteTodo(todo.id)"
        >
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TodoCard",
  props: {
    todo: Object
  },
  methods: {
    editTodo(todo) {
      todo.change = !todo.change;
      this.cacheTitle = todo.title;
    },
    returnTodoTitle(todo) {
      if (todo.title !== this.cacheTitle) {
        todo.title = this.cacheTitle;
      }
      this.cacheTitle = todo.title;
    },
    async sendEditTodo(todo) {
      await this.$store.dispatch("changeTodoTitle", {
        id: todo.id,
        title: todo.title
      });
      todo.change = !todo.change;
    },
    async deleteTodo(id) {
      this.$emit("emit-delete-todo", id);
      await this.$store.dispatch("deleteTodoFromDB", id);
    },
    async changeStatus(todo) {
      todo.done = !todo.done;
      await this.$store.dispatch("changeTodoStatus", {
        id: todo.id,
        done: todo.done
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.list-complete {
  &-item {
    transition: all 1s;
  }
}
.todo {
  min-width: 100%;
  max-width: 100%;
  border-radius: 15px;
  overflow: hidden;
  &-space {
    padding: 15px 0px;
  }
  &-button {
    width: 35px;
    height: 35px;
    .v-icon {
      font-size: 20px;
    }
    @media (max-width: 556px) {
      width: 30px;
      height: 30px;
      .v-icon {
        font-size: 18px;
      }
    }
    @media (max-width: 350px) {
      width: 25px;
      height: 25px;
      .v-icon {
        font-size: 15px;
      }
    }
  }
}
.lineThrough {
  text-decoration: line-through;
  color: yellowgreen !important;
}
.card-title {
  font-size: 24px;
  @media (max-width: 556px) {
    font-size: 18px;
  }
  @media (max-width: 350px) {
    font-size: 16px;
    max-width: 150px;
    overflow: hidden;
    display: table-cell;
  }
}
.change-todo {
  font-size: 24px;
  outline: none;
  padding: 0 0 0 4px;
  width: 80%;
  background: #EEEEEE;
  color: #000;
  @media (max-width: 556px) {
    font-size: 18px;
  }
  @media (max-width: 350px) {
    font-size: 16px;
  }
}

// ======== Checkbox ========
$color: #fff;
$doneFalse: tomato;
$doneTrue: yellowgreen;
.toggleButton {
  cursor: pointer;
  display: block;
  transform-origin: 50% 50%;
  transform-style: preserve-3d;
  transition: transform 0.14s ease;
  &:active {
    transform: rotateX(30deg);
  }
  input {
    display: none;
    & + div {
      border: 3px solid $doneTrue;
      border-radius: 50%;
      position: relative;
      width: 30px;
      height: 30px;
      @media (max-width: 350px) {
        width: 25px;
        height: 25px;
      }
      svg {
        fill: none;
        stroke-width: 3.6;
        stroke: $doneFalse;
        stroke-linecap: round;
        stroke-linejoin: round;
        width: 30px;
        height: 30px;
        display: block;
        position: absolute;
        left: -3px;
        top: -3px;
        right: -3px;
        bottom: -3px;
        z-index: 1;
        stroke-dashoffset: 162.6 - 38;
        stroke-dasharray: 0 162.6 133 (162.6 - 133);
        transition: all 0.4s ease 0s;
        @media (max-width: 350px) {
          width: 25px;
          height: 25px;
        }
      }
      &:before,
      &:after {
        content: "";
        width: 3px;
        height: 12px;
        background: $doneFalse;
        position: absolute;
        left: 50%;
        top: 50%;
        border-radius: 5px;
      }
      &:before {
        opacity: 0;
        transform: scale(0.3) translate(-50%, -50%) rotate(45deg);
        animation: bounceInBefore 0.3s linear forwards 0.3s;
      }
      &:after {
        opacity: 0;
        transform: scale(0.3) translate(-50%, -50%) rotate(-45deg);
        animation: bounceInAfter 0.3s linear forwards 0.3s;
      }
    }
    &:checked + div {
      svg {
        stroke-dashoffset: 162.6;
        stroke-dasharray: 0 162.6 28 (162.6 - 28);
        stroke: $doneTrue;
        transition: all 0.4s ease 0.2s;
      }
      &:before {
        opacity: 0;
        transform: scale(0.3) translate(-50%, -50%) rotate(45deg);
        animation: bounceInBeforeDone 0.3s linear forwards 0s;
      }
      &:after {
        opacity: 0;
        transform: scale(0.3) translate(-50%, -50%) rotate(-45deg);
        animation: bounceInAfterDone 0.3s linear forwards 0s;
      }
    }
  }
}
@keyframes bounceInBefore {
  0% {
    opacity: 0;
    transform: scale(0.3) translate(-50%, -50%) rotate(45deg);
  }
  50% {
    opacity: 0.9;
    transform: scale(1.1) translate(-50%, -50%) rotate(45deg);
  }
  80% {
    opacity: 1;
    transform: scale(0.89) translate(-50%, -50%) rotate(45deg);
  }
  100% {
    opacity: 1;
    transform: scale(1) translate(-50%, -50%) rotate(45deg);
  }
}
@keyframes bounceInAfter {
  0% {
    opacity: 0;
    transform: scale(0.3) translate(-50%, -50%) rotate(-45deg);
  }
  50% {
    opacity: 0.9;
    transform: scale(1.1) translate(-50%, -50%) rotate(-45deg);
  }
  80% {
    opacity: 1;
    transform: scale(0.89) translate(-50%, -50%) rotate(-45deg);
  }
  100% {
    opacity: 1;
    transform: scale(1) translate(-50%, -50%) rotate(-45deg);
  }
}
@keyframes bounceInBeforeDone {
  0% {
    opacity: 1;
    transform: scale(1) translate(-50%, -50%) rotate(45deg);
  }
  100% {
    opacity: 0;
    transform: scale(0.3) translate(-50%, -50%) rotate(45deg);
  }
}
@keyframes bounceInAfterDone {
  0% {
    opacity: 1;
    transform: scale(1) translate(-50%, -50%) rotate(-45deg);
  }
  100% {
    opacity: 0;
    transform: scale(0.3) translate(-50%, -50%) rotate(-45deg);
  }
}
// ======== /Checkbox ========
</style>
