<template>
    <div class="uk-container">
        <div v-if="article" class="uk-card uk-card-default uk-card-body">
            <h1 class="uk-card-title">{{ article.title }}</h1>
            <img :src="article.imgPath" alt="image article" class="uk-width-medium" />
            <p>{{ article.desc }}</p>
            <p class="uk-text-bold">Auteur: {{ article.author }}</p>
            <router-link :to="`/articles/${article.id}/edit`" class="uk-button uk-button-primary">Modifier</router-link>
        </div>
        <div v-else-if="loading">Chargement...</div>
        <div v-else class="uk-alert-danger">Erreur chargement article</div>
    </div>
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
        if (data.code === '200') article.value = data.data;
        else alert(data.message);
    } catch (e) {
        alert('Erreur récupération article');
    } finally {
        loading.value = false;
    }
}

onMounted(load);
</script>
