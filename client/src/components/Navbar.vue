<template>
  <div class="hero-head">
    <header class="navbar">
      <div class="container">
        <div class="navbar-brand">
          <router-link to="/" class="navbar-item">
            <h1 class="title has-text-white">BANKAN</h1>
          </router-link>
          <span class="navbar-burger burger" data-target="navbarMenuHeroC">
            <span></span>
            <span></span>
            <span></span>
          </span>
        </div>
        <div id="navbarMenuHeroC" class="navbar-menu">
          <div class="navbar-end">
            <router-link
              to="/login"
              class="navbar-item this-hover has-text-white"
            >
              Login
            </router-link>
            <router-link
              to="/register"
              class="navbar-item this-hover has-text-white"
            >
              Register
            </router-link>
            <a class="navbar-item this-hover has-text-white">
              Documentation
            </a>
            <span class="navbar-item">
              <a class="button is-dark is-inverted">
                <span class="icon">
                  <i class="fab fa-google"></i>
                </span>
                <span>Sign In</span>
              </a>
            </span>
          </div>
        </div>
      </div>
    </header>
  </div>
</template>
