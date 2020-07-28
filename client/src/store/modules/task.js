import Axios from "axios";
import store from "../../store";

const state = {
  tasks: [],
};
const mutations = {
  SET_TASKS: (state, tasks) => (state.tasks = tasks),
};
const actions = {
  FetchTask: ({ commit }, payload) => {
    return new Promise((resolve, reject) => {
      Axios({
        url: `http://localhost:3000/task/${payload}`,
        method: "get",
        headers: {
          access_token: localStorage.access_token,
        },
      })
        .then(({ data }) => {
          commit("SET_TASKS", data);
          resolve(true);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  AddTask: ({ commit }, payload) => {
    return new Promise((resolve, reject) => {
      Axios({
        url: "http://localhost:3000/task",
        method: "post",
        data: {
          name: payload.name,
          user_id: payload.user_id,
          category_id: payload.category_id,
        },
        headers: {
          access_token: localStorage.access_token,
        },
      })
        .then((data) => {
          resolve(true);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  Next: ({ commit }, payload) => {
    return new Promise((resolve, reject) => {
      Axios({
        url: `http://localhost:3000/task/next/${payload.id}`,
        method: "put",
        headers: {
          access_token: localStorage.access_token,
        },
      })
        .then((data) => {
          store.dispatch("FetchTask", payload.id2);
          resolve(true);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  Back: ({ commit }, payload) => {
    return new Promise((resolve, reject) => {
      Axios({
        url: `http://localhost:3000/task/back/${payload.id}`,
        method: "put",
        headers: {
          access_token: localStorage.access_token,
        },
      })
        .then((data) => {
          store.dispatch("FetchTask", payload.id2);
          resolve(true);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  DeleteTask: ({ commit }, payload) => {
    return new Promise((resolve, reject) => {
      Axios({
        url: `http://localhost:3000/task/${payload.id}`,
        method: "delete",
        headers: {
          access_token: localStorage.access_token,
        },
      })
        .then((data) => {
          store.dispatch("FetchTask", payload.id2);
          resolve(true);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
};
const getters = {
  allTasks: (state) => state.tasks,
};

export default {
  state,
  mutations,
  actions,
  getters,
};
