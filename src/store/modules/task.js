import firebase from "firebase";

export default {
  actions: {
    async deleteTaskFromDB({ dispatch }, id) {
      const uid = await dispatch("getUid");
      await firebase
        .database()
        .ref(`/users/${uid}/tasks`)
        .child(id)
        .remove();
    },
    async changeTaskStatus({ dispatch }, { id, status }) {
      const uid = await dispatch("getUid");
      await firebase
        .database()
        .ref(`/users/${uid}/tasks`)
        .child(id)
        .update({ status });
    },
    // async changeTaskTitle({ dispatch }, { id, title }) {
    //   const uid = await dispatch("getUid");
    //   await firebase
    //     .database()
    //     .ref(`/users/${uid}/tasks`)
    //     .child(id)
    //     .update({ title });
    // },
    async addTask({ dispatch }, { title, description, date, status }) {
      const uid = await dispatch("getUid");
      const task = await firebase
        .database()
        .ref(`/users/${uid}/tasks`)
        .push({ title, description, date, status });
      return { title, description, date, status, id: task.key };
    },
    async fetchTasks({ dispatch }) {
      const uid = await dispatch("getUid");
      const tasks =
        (
          await firebase
            .database()
            .ref(`/users/${uid}/tasks`)
            .once("value")
        ).val() || {};

      return Object.keys(tasks).map(key => ({ ...tasks[key], id: key }));
    }
  }
};
