import Vue from "vue";
import Vuex from "vuex";
import user from "./modules/user";
import org from "./modules/org";
import category from "./modules/category";
import task from "./modules/task";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    user,
    org,
    category,
    task,
  },
});
