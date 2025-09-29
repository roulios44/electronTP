<template>
    <div class="article-item">
        <img :src="article.imgPath" alt="image article" width="150" />
        <div>
            <router-link :to="`/articles/${article.id}`">
                <h3>{{ article.title }}</h3>
            </router-link>
            <p>{{ article.desc }}</p>
            <p><em>Auteur: {{ article.author }}</em></p>
            <button @click="$emit('delete', article.id)">Supprimer</button>
            <router-link :to="`/articles/${article.id}/edit`">Modifier</router-link>
        </div>
    </div>
</template>


<script setup>
defineProps({ article: Object });
</script>