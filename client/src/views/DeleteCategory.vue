<template>
  <section class="hero is-fullheight">
    <div class="hero-body">
      <div class="container">
        <div class="section">
          <div class="container grid-4">
            <div class="columns">
              <div class="column">
                <div class="notification">
                  <h1 class="subtitle has-text-white">
                    Choose Category
                  </h1>
                  <div class="field">
                    <div class="control">
                      <div class="select is-icon">
                        <select v-model="name">
                          <option
                            v-for="category in allCategories"
                            :key="category.id"
                            >{{ category.name }}</option
                          >
                        </select>
                      </div>
                    </div>
                  </div>
                  <div class="field">
                    <div class="columns">
                      <div class="column grid">
                        <p class="control">
                          <button
                            class="button has-text-white background"
                            @click.prevent="deleteCategory()"
                          >
                            Delete
                          </button>
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
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      name: "",
      id: localStorage.tempId,
      org: localStorage.tempOrg,
    };
  },
  methods: {
    deleteCategory() {
      this.$store
        .dispatch("DeleteCategory", {
          name: this.name,
          id: this.id,
        })
        .then((data) => {
          this.$router.push(`/kanban/${this.org}/${this.id}`);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  computed: {
    ...mapGetters(["allCategories"]),
    newId() {
      return this.$route.params.id;
    },
    newOrg() {
      return this.$route.params.organization;
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
