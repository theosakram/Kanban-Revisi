<template>
  <section class="hero is-fullheight">
    <div class="hero-head">
      <header class="navbar">
        <div class="container">
          <div class="navbar-brand">
            <router-link to="/" class="navbar-item">
              <h1 class="subtitle has-text-white">Hello {{ name }},</h1>
            </router-link>
            <span class="navbar-burger burger" data-target="navbarMenuHeroC">
              <span></span>
              <span></span>
              <span></span>
            </span>
          </div>
          <div id="navbarMenuHeroC" class="navbar-menu">
            <div class="navbar-end">
              <router-link
                to="/addOrg"
                class="navbar-item this-hover has-text-white"
              >
                Create Organization
              </router-link>
              <a
                @click.prevent="logout()"
                class="navbar-item this-hover has-text-white"
              >
                Logout
              </a>
            </div>
          </div>
        </div>
      </header>
    </div>

    <div class="hero-body">
      <div class="container">
        <div class="columns is-multiline">
          <Bigcard
            v-for="org in allOrgs"
            :key="org.id"
            :org="org.Organization"
          ></Bigcard>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Bigcard from "../components/Bigcard";
import Navbar from "../components/Navbar";
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      name: localStorage.name,
      id: localStorage.id,
    };
  },
  components: {
    Bigcard,
  },
  methods: {
    logout() {
      localStorage.clear();
      this.$router.push("/");
    },
    ...mapActions(["FetchOrg"]),
  },
  computed: mapGetters(["allOrgs"]),
  created() {
    if (this.$route.path !== "/") {
      if (!localStorage.access_token) {
        this.$router.push("/login");
      }
    }
    this.FetchOrg(this.id);
  },
};
</script>

<style></style>
