<template>
  <section class="hero is-fullheight">
    <Navbar></Navbar>
    <div class="hero-body">
      <div class="container has-text-centered">
        <h1 class="title has-text-white">
          Kanban
        </h1>
        <h2 class="subtitle has-text-white">
          ...now better
        </h2>
      </div>
    </div>
  </section>
</template>

<script>
import Navbar from "../components/Navbar";

export default {
  name: "Home",
  components: {
    Navbar,
  },
};
</script>
