<template>
    <div class="uk-container">
        <h1>Connexion</h1>
        <form @submit.prevent="submit" class="uk-form-stacked">
            <div class="uk-margin">
                <input v-model="email" type="email" class="uk-input" placeholder="Email" required />
            </div>
            <div class="uk-margin">
                <input v-model="password" type="password" class="uk-input" placeholder="Mot de passe" required />
            </div>
            <button type="submit" class="uk-button uk-button-primary">Se connecter</button>
        </form>
        <p v-if="error" class="uk-text-danger uk-margin-top">{{ error }}</p>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const API_BASE = 'http://localhost:3000';
const email = ref('');
const password = ref('');
const error = ref('');
const router = useRouter();

async function submit() {
    error.value = '';
    try {
        const { data } = await axios.post(`${API_BASE}/login`, {
            email: email.value,
            password: password.value
        });

        if (data.code === '200') {
            localStorage.setItem('user', JSON.stringify(data.data));
            router.push('/articles');
        } else {
            error.value = data.message;
        }
    } catch (e) {
        error.value = 'Erreur de connexion';
    }
}
</script>
