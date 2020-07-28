<template>
  <div class="modal">
    <div class="modal-background"></div>
    <div class="modal-content">
      <!-- Any other Bulma elements you want -->
      <div class="columns is-centered">
        <div class="column is-5-tablet is-4-desktop is-3-widescreen">
          <form action="" class="box">
            <div class="field">
              <label for="" class="label">Email</label>
              <div class="control has-icons-left">
                <input
                  type="email"
                  placeholder="e.g. bobsmith@gmail.com"
                  class="input"
                  required
                />
                <span class="icon is-small is-left">
                  <i class="fa fa-envelope"></i>
                </span>
              </div>
            </div>
            <div class="field">
              <button class="button is-success">
                Edit
              </button>
            </div>
          </form>
        </div>
      </div>
      <!-- a -->
    </div>
    <button class="modal-close is-large" aria-label="close"></button>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      name: this.$route.params.name,
    };
  },
  methods: {
    rebrand() {
      console.log();
      this.$store
        .dispatch("EditCategory", {
          name: this.$route.params.name,
          name2: this.name,
        })
        .then((data) => {
          this.$router.push("/dashboard");
        })
        .catch((err) => {
          console.log(err.response);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: err.response.statusText,
          });
        });
    },
  },
  created() {
    if (this.$route.path !== "/") {
      if (!localStorage.access_token) {
        this.$router.push("/login");
      }
    }
  },
};
</script>
