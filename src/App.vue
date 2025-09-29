<template>

  <!--  Navigation-->
  <ul uk-tab>
    <li class="uk-active">
      <router-link to="/">Page One</router-link>
    </li>
    <li>
      <router-link to="/page-2">Page Two</router-link>
    </li>
  </ul>

  <!-- Fonctionnement Vue pour en temps remplacer la page activer -->
  <router-view/>
</template>

<script setup lang="ts">
</script>