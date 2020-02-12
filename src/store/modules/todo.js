import firebase from "firebase/app";

export default {
  actions: {
    async deleteTodoFromDB({ dispatch }, id) {
      const uid = await dispatch("getUid");
      await firebase
        .database()
        .ref(`/users/${uid}/todos`)
        .child(id)
        .remove();
    },
    async changeTodoStatus({ dispatch }, { id, done }) {
      const uid = await dispatch("getUid");
      await firebase
        .database()
        .ref(`/users/${uid}/todos`)
        .child(id)
        .update({ done });
    },
    async changeTodoTitle({ dispatch }, { id, title }) {
      const uid = await dispatch("getUid");
      await firebase
        .database()
        .ref(`/users/${uid}/todos`)
        .child(id)
        .update({ title });
    },
    async addTodo({ dispatch }, { title, done, change }) {
      const uid = await dispatch("getUid");
      const todo = await firebase
        .database()
        .ref(`/users/${uid}/todos`)
        .push({ title, done, change });
      return { title, done, change, id: todo.key };
    },
    async fetchTodo({ dispatch }) {
      const uid = await dispatch("getUid");
      const todos =
        (
          await firebase
            .database()
            .ref(`/users/${uid}/todos`)
            .once("value")
        ).val() || {};

      return Object.keys(todos).map(key => ({ ...todos[key], id: key }));
    }
  }
};
