<template>
  <section class="hero is-fullheight">
    <Navbar></Navbar>
    <div class="hero-body">
      <div class="container">
        <div class="section">
          <div class="container grid-4">
            <div class="columns">
              <div class="column">
                <div class="notification">
                  <h1 class="subtitle has-text-white">Login</h1>
                  <div class="field">
                    <p class="control has-icons-left has-icons-right">
                      <input
                        class="input"
                        type="email"
                        placeholder="Email"
                        v-model="email"
                      />
                      <span class="icon is-small is-left">
                        <i class="fas fa-envelope"></i>
                      </span>
                      <span class="icon is-small is-right">
                        <i class="fas fa-check"></i>
                      </span>
                    </p>
                  </div>
                  <div class="field">
                    <p class="control has-icons-left">
                      <input
                        class="input"
                        type="password"
                        placeholder="Password"
                        v-model="password"
                      />
                      <span class="icon is-small is-left">
                        <i class="fas fa-lock"></i>
                      </span>
                    </p>
                  </div>
                  <div class="field">
                    <div class="columns">
                      <div class="column grid">
                        <a
                          class="button this-hover has-text-white background"
                          @click.prevent="login()"
                          >Login</a
                        >
                      </div>
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
      email: "",
      password: "",
    };
  },
  methods: {
    login() {
      this.$store
        .dispatch("Login", {
          email: this.email,
          password: this.password,
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
