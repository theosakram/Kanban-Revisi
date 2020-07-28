<template>
  <div class="column background">
    <aside class="menu">
      <p class="menu-label">Organization</p>
      <ul class="menu-list">
        <li v-for="org in allOrgs" :key="org.id">
          <router-link
            @click.native="
              FetchMembers(newOrg), FetchCategories(newId), FetchTask(newId)
            "
            :to="'/kanban/' + `${org.Organization.name}/` + org.Organization.id"
            class="this-hover this-hover has-text-white"
            :class="{ 'is-active': org.Organization.name === newOrg }"
            >{{ org.Organization.name }}</router-link
          >
        </li>
        <h1 class="has-text-white">- - - - -</h1>
        <li>
          <router-link to="/addOrg" class="this-hover this-hover has-text-white"
            >New</router-link
          >
        </li>
        <li>
          <a
            @click.prevent="toEditChoose()"
            class="this-hover this-hover has-text-white"
            >Rebrand</a
          >
        </li>
        <li>
          <router-link
            to="/deleteOrg"
            class="this-hover this-hover has-text-white"
            >Declare Bankruptcy</router-link
          >
        </li>
      </ul>

      <h1 class="has-text-white">- - - - - - - -</h1>
      <p class="menu-label">Category</p>
      <ul class="menu-list">
        <li v-for="category in allCategories" :key="category.id">
          <router-link to="/" class="this-hover this-hover has-text-white">
            {{ category.name }}
          </router-link>
        </li>

        <h1 class="has-text-white">- - - - -</h1>

        <li>
          <a
            @click.prevent="addCategory()"
            class="this-hover this-hover has-text-white"
            >Add Category</a
          >
        </li>

        <li>
          <router-link
            to="/EditCatChoose"
            class="this-hover this-hover has-text-white"
            >Edit Category</router-link
          >
        </li>

        <li>
          <a
            @click.prevent="toDeletePage(newId, newOrg)"
            class="this-hover this-hover has-text-white"
            >Delete Category</a
          >
        </li>
      </ul>

      <h1 class="has-text-white">- - - - - - - -</h1>

      <p class="menu-label">Member(s)</p>
      <ul class="menu-list">
        <li v-for="member in allMembers" :key="member.id">
          <router-link to="/add" class="this-hover this-hover has-text-white">{{
            member.User.name
          }}</router-link>
        </li>
        <h1 class="has-text-white">- - - - -</h1>
        <li>
          <a
            @click.prevent="addMember()"
            class="this-hover this-hover has-text-white"
            >Add Member</a
          >
        </li>

        <li>
          <a
            @click.prevent="kickMember()"
            class="this-hover this-hover has-text-white"
            >Kick Member</a
          >
        </li>
      </ul>

      <h1 class="has-text-white">- - - - - - - -</h1>

      <p class="menu-label">Actions</p>
      <ul class="menu-list">
        <li>
          <a
            class="this-hover this-hover has-text-white"
            @click.prevent="logout()"
            >Logout</a
          >
        </li>
      </ul>
    </aside>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      id: localStorage.id,
    };
  },
  computed: {
    ...mapGetters(["allOrgs", "allMembers", "allCategories"]),
    newOrg() {
      return this.$route.params.organization;
    },
    newId() {
      return this.$route.params.id;
    },
  },
  methods: {
    logout() {
      localStorage.clear();
      this.$router.push("/");
    },
    ...mapActions(["FetchOrg", "FetchMembers", "FetchCategories", "FetchTask"]),
    toEditChoose() {
      this.$router.push({
        name: "EditOrgChoose",
        params: {
          id: `${this.newId}`,
          name: `${this.newOrg}`,
          organization: `${this.newOrg}`,
        },
      });
    },
    addMember() {
      Swal.fire({
        title: "Find by Username",
        input: "text",
        inputAttributes: {
          autocapitalize: "off",
        },
        showCancelButton: true,
        confirmButtonText: "Search",
        showLoaderOnConfirm: true,
        preConfirm: (login) => {
          return fetch(`http://localhost:3000/${login}`)
            .then((response) => {
              if (!response.ok) {
                throw new Error(response.statusText);
              }
              return response.json();
            })
            .catch((error) => {
              Swal.showValidationMessage(`Request failed: ${error}`);
            });
        },
        allowOutsideClick: () => !Swal.isLoading(),
      }).then((result) => {
        if (result.value) {
          this.$store
            .dispatch("InviteMember", {
              id: this.newId,
              name: result.value.user.name,
            })
            .then((data) => {
              this.FetchMembers(this.newOrg);
              Swal.fire({
                icon: "success",
                title: `User ${result.value.user.name} Found and Added as Member!`,
              });
            })
            .catch((err) => {
              Swal.fire({
                icon: "error",
                title: `User ${result.value.user.name} is already a Member!`,
              });
            });
        } else
          Swal.fire({
            icon: "error",
            title: "User Not Found!",
            text: "Please check for spelling",
          });
      });
    },
    kickMember() {
      Swal.fire({
        title: "Find by Username",
        input: "text",
        inputAttributes: {
          autocapitalize: "off",
        },
        showCancelButton: true,
        confirmButtonText: "Search",
        showLoaderOnConfirm: true,
        preConfirm: (login) => {
          return fetch(`http://localhost:3000/${login}`)
            .then((response) => {
              if (!response.ok) {
                throw new Error(response.statusText);
              }
              return response.json();
            })
            .catch((error) => {
              Swal.showValidationMessage(`Request failed: ${error}`);
            });
        },
        allowOutsideClick: () => !Swal.isLoading(),
      }).then((result) => {
        if (result.value) {
          this.$store
            .dispatch("KickMember", {
              id: this.newId,
              name: result.value.user.name,
            })
            .then((data) => {
              this.FetchMembers(this.newOrg);
              Swal.fire({
                icon: "success",
                title: `User ${result.value.user.name} kicked from Organizaion!`,
              });
            })
            .catch((err) => {
              Swal.fire({
                icon: "error",
                title: `User ${result.value.user.name} is not a Member!`,
              });
            });
        } else
          Swal.fire({
            icon: "error",
            title: "User Not Found!",
            text: "Please check for spelling",
          });
      });
    },
    addCategory() {
      Swal.fire({
        title: "Input category name",
        input: "text",
        inputAttributes: {
          autocapitalize: "off",
        },
        showCancelButton: true,
        confirmButtonText: "Add",
        showLoaderOnConfirm: true,
        preConfirm: (login) => {
          this.$store
            .dispatch("AddCategory", {
              id: this.newId,
              name: login,
            })
            .then((data) => {
              this.FetchCategories(this.newId);
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
          this.FetchCategories(this.newId);
        } else
          Swal.fire({
            icon: "error",
            text: "Failed",
          });
      });
    },
    toDeletePage(id, org) {
      localStorage.setItem("tempId", id);
      localStorage.setItem("tempOrg", org);
      this.$router.push("/deleteCategory");
    },
  },
  created() {
    this.FetchOrg(this.id);
    this.FetchMembers(this.newOrg);
    this.FetchCategories(this.newId);
  },
};
</script>

<style scoped></style>
