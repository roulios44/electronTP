<template>
    <div class="page">
        <h1>Connexion</h1>
        <form @submit.prevent="submit">
            <input v-model="email" placeholder="Email" />
            <input v-model="password" type="password" placeholder="Mot de passe" />
            <button type="submit">Se connecter</button>
        </form>
        <p v-if="error">{{ error }}</p>
    </div>
</template>


<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';


const API_BASE = 'http://localhost:3000';


const email = ref('');
const password = ref('');
const error = ref(null);
const router = useRouter();


async function submit() {
    error.value = null;
    try {
        const { data } = await axios.post(`${API_BASE}/login`, { email: email.value, password: password.value });
        if (data.code === 'SUCCESS') {
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