<template>
  <section class="hero is-fullheight">
    <div class="hero-body">
      <div class="container">
        <div class="section">
          <div class="container grid-4">
            <div class="columns">
              <div class="column">
                <div class="notification">
                  <h1 class="subtitle this-hover has-text-white">
                    Create Organization
                  </h1>
                  <div class="field">
                    <p class="control has-icons-left has-icons-right">
                      <input
                        class="input"
                        type="text"
                        placeholder="Name"
                        v-model="name"
                      />
                      <span class="icon is-small is-left">
                        <i class="fas fa-building"></i>
                      </span>
                      <span class="icon is-small is-right">
                        <i class="fas fa-check"></i>
                      </span>
                    </p>
                  </div>
                  <div class="columns">
                    <div class="column">
                      <p class="control">
                        <a
                          @click.prevent="addOrg()"
                          class="button this-hover has-text-white background"
                          >Create</a
                        >
                      </p>
                    </div>
                    <div class="column">
                      <p class="control">
                        <router-link
                          to="/kanban"
                          class="button this-hover has-text-white background"
                          >Cancel</router-link
                        >
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Navbar from "../components/Navbar";
export default {
  components: {
    Navbar,
  },
  data() {
    return {
      name: "",
      id: localStorage.id,
    };
  },
  methods: {
    addOrg() {
      this.$store
        .dispatch("AddOrg", {
          name: this.name,
          id: this.id,
        })
        .then((data) => {
          this.$router.push("/dashboard");
        })
        .catch((err) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: err.response.statusText,
          });
        });
    },
  },
};
</script>

<style scoped>
.notification {
  border: 1px solid white !important;
  border-radius: 5px;
}
</style>
