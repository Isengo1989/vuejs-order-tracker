<template>
  <div class="col-md-12">
    <form @submit.prevent="login">
      <h2>Login</h2>
      <input
          type="email"
          placeholder="Email address..."
          v-model="email"
      />
      <input
          type="password"
          placeholder="password..."
          v-model="password"
      />
      <button type="submit">
        Login
      </button>
    </form>
  </div>
</template>

<script>
import firebase from 'firebase';

export default {
  name: 'Home',
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    login() {
      firebase
          .auth()
          .signInWithEmailAndPassword(this.email, this.password)
          .then(() => {
            alert('Successfully logged in');
            this.$router.push('/maps');
          })
          .catch(error => {
            alert(error.message);
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