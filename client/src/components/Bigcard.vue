<template>
  <div class="column is-one-third">
    <div class="card">
      <div class="card-image">
        <figure class="image is-4by3">
          <img
            src="https://images.goodsmile.info/cgm/images/product/20190415/8248/59557/large/1d2491914d38ce40215e6ae5f4e8a3fb.jpg"
            alt="Kizuna Ai"
          />
        </figure>
      </div>

      <div class="card-content">
        <div class="media">
          <div class="media-content">
            <a @click.prevent="toKanban()" class="title is-4 has-text-black"
              ><button class="button is-info is-outlined">
                {{ org.name }}
              </button></a
            >
          </div>
        </div>

        <div class="content">
          This {{ org.name }} is just a Made-up Organization, don't expect fancy
          Cards. <a href="#">#LOL</a> <br />
          <a href="#">#KILLURSELF</a>
          <br />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["org"],
  methods: {
    toKanban() {
      this.$router.push({
        name: "Kanban",
        params: {
          id: `${this.org.id}`,
          name: `${this.org.name}`,
          organization: `${this.org.name}`,
        },
      });
    },
  },
};
</script>

<style></style>
