<template>
    <div class="uk-container">
        <h1>{{ isNew ? 'Créer' : 'Modifier' }} article</h1>
        <form @submit.prevent="save" class="uk-form-stacked">
            <div class="uk-margin">
                <input v-model="title" class="uk-input" placeholder="Titre" required />
            </div>
            <div class="uk-margin">
                <textarea v-model="desc" class="uk-textarea" placeholder="Description" required></textarea>
            </div>
            <div class="uk-margin">
                <input v-model="author" class="uk-input" placeholder="Auteur" required />
            </div>
            <div class="uk-margin">
                <input v-model="imgPath" class="uk-input" placeholder="URL Image" required />
            </div>
            <button type="submit" class="uk-button uk-button-primary">Enregistrer</button>
        </form>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const props = defineProps({ id: String });
const isNew = props.id === 'new' || !props.id;
const title = ref('');
const desc = ref('');
const author = ref('');
const imgPath = ref('');
const router = useRouter();
const API_BASE = 'http://localhost:3000';

async function load() {
    if (!isNew) {
        try {
            const { data } = await axios.get(`${API_BASE}/articles/${props.id}`);
            if (data.code === '200') {
                title.value = data.data.title;
                desc.value = data.data.desc;
                author.value = data.data.author;
                imgPath.value = data.data.imgPath;
            } else alert(data.message);
        } catch (e) {
            alert('Impossible de charger');
        }
    }
}

async function save() {
    try {
        const payload = { id: isNew ? undefined : props.id, title: title.value, desc: desc.value, author: author.value, imgPath: imgPath.value };
        const { data } = await axios.post(`${API_BASE}/articles/save`, payload);
        if (data.code === '200') router.push('/articles');
        else alert(data.message);
    } catch (e) {
        alert('Erreur sauvegarde');
    }
}

onMounted(load);
</script>
