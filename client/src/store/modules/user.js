import Axios from "axios";

const state = {};
const mutations = {};
const actions = {
  Register: ({ commit }, payload) => {
    return new Promise((resolve, reject) => {
      Axios({
        url: "http://localhost:3000/register",
        method: "post",
        data: payload,
      })
        .then((data) => {
          resolve(true);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  Login: ({ commit }, payload) => {
    return new Promise((resolve, reject) => {
      Axios({
        url: "http://localhost:3000/login",
        method: "post",
        data: payload,
      })
        .then((data) => {
          localStorage.setItem("access_token", data.data.access_token);
          localStorage.setItem("name", data.data.name);
          localStorage.setItem("id", data.data.id);
          resolve(true);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
};
const getters = {};

export default {
  state,
  mutations,
  actions,
  getters,
};
