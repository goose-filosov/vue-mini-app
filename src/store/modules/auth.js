import firebase from "firebase/app";

export default {
  actions: {
    // eslint-disable-next-line no-unused-vars
    async login({ commit }, { email, password }) {
      await firebase.auth().signInWithEmailAndPassword(email, password);
    },
    async register({ dispatch }, { email, password, name }) {
      await firebase.auth().createUserWithEmailAndPassword(email, password);
      const uid = await dispatch("getUid");
      await firebase
        .database()
        .ref(`/users/${uid}/info`)
        .set({
          name
        });
    },
    getUid() {
      const user = firebase.auth().currentUser;
      return user ? user.uid : null;
    },
    async logout({ commit }) {
      await firebase.auth().signOut();
      commit("clearInfo");
    }
  }
};
