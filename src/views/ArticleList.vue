<template>
    <div class="uk-container">
        <h1>Articles</h1>
        <div class="uk-margin">
            <button @click="reload" class="uk-button uk-button-default">Rafraîchir</button>
            <router-link to="/articles/new" class="uk-button uk-button-primary">Créer un article</router-link>
        </div>

        <div v-if="loading">Chargement...</div>
        <div v-if="error" class="uk-alert-danger">{{ error }}</div>

        <ul v-if="articles.length" class="uk-list uk-list-divider">
            <li v-for="article in articles" :key="article.id">
                <ArticleItem :article="article" @delete="onDelete" />
            </li>
        </ul>
        <div v-else class="uk-alert-warning">Pas d'articles disponibles.</div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import ArticleItem from './ArticleItem.vue';

const API_BASE = 'http://localhost:3000';
const articles = ref([]);
const loading = ref(false);
const error = ref('');

async function load() {
    loading.value = true;
    error.value = '';
    try {
        const { data } = await axios.get(`${API_BASE}/articles/`);
        if (data.code === '200' && Array.isArray(data.data)) {
            articles.value = data.data;
        } else {
            error.value = data.message || 'Erreur récupération articles';
        }
    } catch (e) {
        error.value = 'Erreur récupération articles';
    } finally {
        loading.value = false;
    }
}

async function onDelete(id) {
    try {
        const { data } = await axios.delete(`${API_BASE}/articles/${id}`);
        if (data.code === '200') {
            articles.value = articles.value.filter(x => x.id !== id);
        } else {
            alert(data.message || 'Impossible de supprimer');
        }
    } catch (e) {
        alert('Impossible de supprimer');
    }
}

function reload() { load(); }
onMounted(load);
</script>
