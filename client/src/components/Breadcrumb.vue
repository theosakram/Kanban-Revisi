<template>
  <nav class="breadcrumb" aria-label="breadcrumbs">
    <ul>
      <li>
        <router-link to="/dashboard" href="#" class="has-text-white"
          >Home</router-link
        >
      </li>
      <li>
        <a href="#" class="has-text-white"> {{ name }}</a>
      </li>
      <li>
        <p
          style="padding-left: 10px; padding-right: 10px;"
          class="has-text-white"
        >
          Kanban
        </p>
      </li>
      <li>
        <a href="#" class="has-text-white"> {{ newOrg }}</a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      name: localStorage.name,
    };
  },
  computed: {
    newOrg() {
      return this.$route.params.organization;
    },
  },
};
</script>

<style></style>
