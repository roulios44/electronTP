<template>
    <div v-if="article" class="uk-card uk-card-default uk-card-body uk-margin">
        <div class="uk-grid-small uk-flex-middle" uk-grid>
            <div class="uk-width-auto" v-if="article.imgPath">
                <img :src="article.imgPath" class="uk-thumbnail" alt="image article" width="150" />
            </div>
            <div class="uk-width-expand">
                <router-link :to="`/articles/${article.id}`">
                    <h3>{{ article.title }}</h3>
                </router-link>
                <p>{{ article.desc }}</p>
                <p><em>Auteur: {{ article.author }}</em></p>
                <button @click="$emit('delete', article.id)" class="uk-button uk-button-danger">Supprimer</button>
                <router-link :to="`/articles/${article.id}/edit`"
                    class="uk-button uk-button-secondary">Modifier</router-link>
            </div>
        </div>
    </div>
</template>

<script setup>
defineProps({
    article: {
        type: Object,
        required: true
    }
});
</script>
