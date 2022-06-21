<template>
  <div id="app">
    <meta name="title" content="OnPage SEO">
    <title>Meta-Tags leicht erklärt – Ryte Wiki</title>
    <nav class="navbar navbar-expand navbar-dark bg-dark ps-2">
      <router-link to="/" class="navbar-brand ms-2">Shopware Dashboard</router-link>
      <div class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link to="/maps" class="nav-link">Maps</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/list" class="nav-link">Liste</router-link>
        </li>
        <li class="nav-item">
          <a class="nav-link right-button" @click="logout">Logout</a>
        </li>
      </div>
    </nav>

    <div class="container-fluid mt-3">
      <router-view/>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase';


export default {
  name: "app",
  metaInfo: {
    // if no subcomponents specify a metaInfo.title, this title will be used
    title: 'Default Title',
    // all titles will be injected into this template
    titleTemplate: '%s | My Awesome Webapp'
  },
  methods: {
    logout() {
      firebase
          .auth()
          .signOut()
          .then(() => {
            alert('Successfully logged out');
            this.$router.push('/');
          })
          .catch(error => {
            alert(error.message);
            this.$router.push('/');
          });
    },
  },
};
</script>

<style scoped>

.right-button {
  cursor: pointer;

}
.container h2 {
  text-align: center;
  margin: 25px auto;
}
</style>