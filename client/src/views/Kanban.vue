<template>
  <section class="hero is-fullheight">
    <div class="hero-body">
      <div class="container">
        <Breadcrumb :org="org"></Breadcrumb>
        <h1 class="title has-text-white">{{ newOrg }}</h1>
        <section class="section">
          <div class="columns" style="overflow: auto;">
            <Sidebar></Sidebar>
            <Category
              v-for="category in allCategories"
              :key="category.id"
              :category="category"
            ></Category>
          </div>
        </section>
      </div>
    </div>
  </section>
</template>

<script>
import Sidebar from "@/components/Sidebar.vue";
import Breadcrumb from "@/components/Breadcrumb.vue";
import Category from "@/components/Category.vue";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      org: this.$route.params.organization,
      id: this.$route.params.id,
    };
  },
  components: {
    Sidebar,
    Breadcrumb,
    Category,
  },
  created() {
    if (this.$route.path !== "/") {
      if (!localStorage.access_token) {
        this.$router.push("/login");
      }
    }
  },
  computed: {
    newOrg() {
      return this.$route.params.organization;
    },
    newId() {
      return this.$route.params.id;
    },
    ...mapGetters(["allCategories"]),
  },
};
</script>

<style scoped>
.background {
  background: #2f3036;
}
</style>
