<template>
    <div v-if="article">
        <h1>{{ article.title }}</h1>
        <img :src="article.imgPath" alt="image article" width="300" />
        <p>{{ article.desc }}</p>
        <p><strong>Auteur: {{ article.author }}</strong></p>
        <router-link :to="`/articles/${article.id}/edit`">Modifier</router-link>
    </div>
    <div v-else-if="loading">Chargement...</div>
    <div v-else>Erreur chargement article</div>
</template>


<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
const props = defineProps({ id: String });
const API_BASE = 'http://localhost:3000';
const article = ref(null);
const loading = ref(false);


async function load() {
    loading.value = true;
    try {
        const { data } = await axios.get(`${API_BASE}/articles/${props.id}`);
        if (data.code === 'SUCCESS') article.value = data.data;
        else alert(data.message);
    } catch (e) {
        alert('Erreur récupération article');
    } finally {
        loading.value = false;
    }
}


onMounted(load);
</script>