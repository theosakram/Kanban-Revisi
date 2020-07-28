import Axios from "axios";

const state = {
  orgs: [],
  members: [],
};
const mutations = {
  SetOrgs: (state, orgs) => (state.orgs = orgs),
  SetMembers: (state, members) => (state.members = members),
};
const actions = {
  FetchOrg: ({ commit }, payload) => {
    return new Promise((resolve, reject) => {
      Axios({
        url: `http://localhost:3000/org/all/${payload}`,
        method: "get",
        headers: {
          access_token: localStorage.access_token,
        },
      })
        .then((data) => {
          commit("SetOrgs", data.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  AddOrg: ({ commit }, payload) => {
    return new Promise((resolve, reject) => {
      Axios({
        url: `http://localhost:3000/org/user/${payload.id}`,
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

  EditOrg: ({ commit }, payload) => {
    return new Promise((resolve, reject) => {
      Axios({
        url: `http://localhost:3000/org/${payload.name}`,
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

  DeleteOrg: ({ commit }, payload) => {
    return new Promise((resolve, reject) => {
      Axios({
        url: `http://localhost:3000/org/${payload}`,
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

  FetchMembers: ({ commit }, payload) => {
    return new Promise((resolve, reject) => {
      Axios({
        url: `http://localhost:3000/org/${payload}`,
        method: "get",
        headers: {
          access_token: localStorage.access_token,
        },
      })
        .then((data) => {
          commit("SetMembers", data.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  InviteMember: ({ commit }, payload) => {
    return new Promise((resolve, reject) => {
      Axios({
        url: `http://localhost:3000/org/enter/${payload.id}/${payload.name}`,
        method: "post",
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

  KickMember: ({ commit }, payload) => {
    return new Promise((resolve, reject) => {
      Axios({
        url: `http://localhost:3000/org/kick/${payload.id}/${payload.name}`,
        method: "delete",
        headers: {
          access_token: localStorage.access_token,
        },
      })
        .then((data) => {
          resolve(true);
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
  },
};
const getters = {
  allOrgs: (state) => state.orgs,
  allMembers: (state) => state.members,
};

export default {
  state,
  mutations,
  actions,
  getters,
};
