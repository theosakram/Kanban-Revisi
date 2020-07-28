import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Dashboard from "../views/Dashboard.vue";
import Kanban from "../views/Kanban.vue";
import AddOrg from "../views/AddOrg.vue";
import EditOrgChoose from "../views/EditOrgChoose.vue";
import EditOrgPage from "../views/EditOrgPage.vue";
import DeleteOrg from "../views/DeleteOrg.vue";
import DeleteCategory from "../views/DeleteCategory.vue";
import EditCatChoose from "../views/EditCatChoose.vue";
import EditCatPage from "../views/EditCatPage.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/addOrg",
    name: "AddOrganization",
    component: AddOrg,
  },
  {
    path: "/edOrgChoose",
    name: "EditOrgChoose",
    component: EditOrgChoose,
  },
  {
    path: "/edOrgPage",
    name: "EditOrgPage",
    component: EditOrgPage,
  },
  {
    path: "/deleteOrg",
    name: "DeleteOrg",
    component: DeleteOrg,
  },
  {
    path: "/deleteCategory",
    name: "DeleteCategory",
    component: DeleteCategory,
  },
  {
    path: "/editCatChoose",
    name: "EditCatChoose",
    component: EditCatChoose,
  },
  {
    path: "/editCatPage",
    name: "EditCatPage",
    component: EditCatPage,
  },
  {
    path: "/kanban/:organization/:id",
    name: "Kanban",
    component: Kanban,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
