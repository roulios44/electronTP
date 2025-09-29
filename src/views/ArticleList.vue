<template>
    <div>
        <h1>Articles</h1>
        <button @click="reload">Rafraîchir</button>
        <router-link to="/articles/new">Créer un article</router-link>


        <div v-if="loading">Chargement...</div>
        <div v-if="error">{{ error }}</div>


        <ul>
            <li v-for="a in articles" :key="a.id">
                <ArticleItem :article="a" @delete="onDelete" />
            </li>
        </ul>
    </div>
</template>


<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import ArticleItem from './ArticleItem.vue';


const API_BASE = 'http://localhost:3000';
const articles = ref([]);
const loading = ref(false);
const error = ref(null);

await loadItem()


async function loadItem() {
    loading.value = true;
    error.value = null;
    try {
        const { data } = await axios.get(`${API_BASE}/articles/`);
        if (data.code === 'SUCCESS') {
            articles.value = data.data;
        } else {
            error.value = data.message;
        }
    } catch (e) {
        error.value = 'Erreur récupération articles';
    } finally {
        loading.value = false;
    }
}


</script>