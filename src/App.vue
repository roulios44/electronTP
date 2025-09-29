<template>
  <div>
    <!-- Header -->
    <nav class="uk-navbar-container uk-margin" uk-navbar>
      <div class="uk-navbar-left">
        <a class="uk-navbar-item uk-logo" href="#">MonApp</a>
        <ul class="uk-navbar-nav">
          <li><router-link to="/articles">Articles</router-link></li>
        </ul>
      </div>

      <div class="uk-navbar-right">
        <ul class="uk-navbar-nav">
          <li v-if="!user"><router-link to="/login">Connexion</router-link></li>
          <li v-if="!user"><router-link to="/signup">Inscription</router-link></li>
          <li v-else class="uk-active">
            <a @click.prevent="logout">Déconnexion</a>
          </li>
        </ul>
      </div>
    </nav>

    <!-- Contenu -->
    <div class="uk-container">
      <router-view />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const user = ref(null);

onMounted(() => {
  const storedUser = localStorage.getItem('user');
  if (storedUser) user.value = JSON.parse(storedUser);
});

function logout() {
  localStorage.removeItem('user');
  user.value = null;
  router.push('/login');
}
</script>

<style>
/* Ajustement du container pour le header UIkit */
.uk-navbar-container {
  background-color: #f0f0f0;
  padding: 10px;
}
</style>
