<template>
  <div class="card garmin" v-if="task.category_id === category.id">
    <div class="card-content">
      <div class="content has-text-white">
        <h3 class="has-text-white">{{ task.name }}</h3>
        <h4 class="has-text-white">Owner: {{ name }}</h4>
      </div>
    </div>

    <footer class="card-footer">
      <a
        style="text-decoration: none;"
        class="card-footer-item this-hover has-text-white"
        @click.prevent="next()"
        >Next</a
      >
      <a
        style="text-decoration: none;"
        class="card-footer-item this-hover has-text-white"
        @click.prevent="back()"
        >Back</a
      >
      <a
        style="text-decoration: none;"
        class="card-footer-item this-hover has-text-white"
        @click.prevent="deleteTask()"
        >Delete</a
      >
    </footer>
  </div>
</template>

<script>
import Axios from "axios";
import { mapActions } from "vuex";
export default {
  name: "Card",
  props: ["task", "category"],
  data() {
    return {
      name: localStorage.name,
      status: false,
    };
  },
  computed: {
    newId() {
      return this.$route.params.id;
    },
  },
  methods: {
    deleteTask() {
      let payload = {
        id: this.task.id,
        id2: this.newId,
      };
      this.$store
        .dispatch("DeleteTask", payload)
        .then((data) => {
          this.FetchCategories(this.newId);
        })
        .catch((err) => console.log(err));
    },
    next() {
      let payload = {
        id: this.task.id,
        id2: this.newId,
      };
      this.$store
        .dispatch("Next", payload)
        .then((data) => {
          this.FetchCategories(this.newId);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    back() {
      let payload = {
        id: this.task.id,
        id2: this.newId,
      };
      this.$store
        .dispatch("Back", payload)
        .then((data) => {
          this.FetchCategories(this.newId);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    ...mapActions(["FetchCategories", "FetchTask"]),
  },
  created() {
    this.FetchTask(this.newId);
  },
};
</script>

<style scoped>
.garmin {
  background: #212025;
  margin-bottom: 15px;
  border-radius: 5px;
}

.no-decor {
  text-decoration: none;
}
</style>
