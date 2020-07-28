import Axios from "axios";

const state = {
  categories: [],
};
const mutations = {
  SetCategories: (state, categories) => (state.categories = categories),
};
const actions = {
  FetchCategories: ({ commit }, payload) => {
    return new Promise((resolve, reject) => {
      Axios({
        url: `http://localhost:3000/category/${payload}`,
        method: "get",
        headers: {
          access_token: localStorage.access_token,
        },
      })
        .then((data) => {
          commit("SetCategories", data.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  AddCategory: ({ commit }, payload) => {
    return new Promise((resolve, reject) => {
      Axios({
        url: `http://localhost:3000/category/${payload.id}`,
        method: "post",
        data: {
          name: payload.name,
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

  DeleteCategory: ({ commit }, payload) => {
    return new Promise((resolve, reject) => {
      Axios({
        url: `http://localhost:3000/category/${payload.name}/${payload.id}`,
        method: "delete",
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

  EditCategory: ({ commit }, payload) => {
    return new Promise((resolve, reject) => {
      Axios({
        url: `http://localhost:3000/category/${payload.name}`,
        method: "put",
        data: {
          name2: payload.name2,
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
};
const getters = {
  allCategories: (state) => state.categories,
};

export default {
  state,
  mutations,
  actions,
  getters,
};
