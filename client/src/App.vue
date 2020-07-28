<template>
  <div id="app" class="background">
    <router-view />
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.grid-4 {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}

.grid-4 * {
  grid-column: 2/3;
}

.background {
  background: #37383f;
}

.this-hover.has-text-white:hover {
  color: #2f3036 !important;
}
</style>
