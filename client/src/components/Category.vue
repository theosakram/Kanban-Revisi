<template>
  <div class="column">
    <div class="notification">
      <h1 @click.prevent="addTask()" class="subtitle this-hover has-text-white">
        {{ category.name }} <i class="fas fa-plus"></i>
      </h1>
      <div class="columns is-multiline">
        <Card
          v-for="task in allTasks"
          :key="task.id"
          :task="task"
          :category="newCat"
        ></Card>
      </div>
    </div>
  </div>
</template>

<script>
import Card from "../components/Card";
import { mapGetters, mapActions } from "vuex";
export default {
  props: ["category"],
  components: {
    Card,
  },
  data() {
    return {
      newCat: this.category,
      newCatId: this.category.id,
      user_id: localStorage.id,
    };
  },
  computed: {
    newId() {
      return this.$route.params.id;
    },
    ...mapGetters(["allTasks"]),
  },
  methods: {
    ...mapActions(["FetchTask", "AddTask"]),
    addTask() {
      Swal.fire({
        title: "Input task name",
        input: "text",
        inputAttributes: {
          autocapitalize: "off",
        },
        showCancelButton: true,
        confirmButtonText: "Add",
        showLoaderOnConfirm: true,
        preConfirm: (login) => {
          this.$store
            .dispatch("AddTask", {
              name: login,
              user_id: this.user_id,
              category_id: this.newCatId,
            })
            .then((data) => {
              this.FetchTask(this.newId);
            })
            .catch((err) => {
              Swal.fire({
                icon: "error",
                title: err,
              });
            });
        },
        allowOutsideClick: () => !Swal.isLoading(),
      }).then((result) => {
        if (result.value) {
          this.FetchTask(this.newId);
        } else
          Swal.fire({
            icon: "error",
            text: "Failed",
          });
      });
    },
  },
  created() {
    this.FetchTask(this.newId);
  },
};
</script>

<style>
.subtitle {
  word-break: normal;
  cursor: pointer;
}

.notification {
  text-align: center;
  display: block;
  padding: 1.5rem;
  background: #37383f;
  border: 0px solid white !important;
}
</style>
