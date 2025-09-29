<template>
    <div>
        <h1>Inscription</h1>
        <form @submit.prevent="submit">
            <input v-model="name" placeholder="Nom" />
            <input v-model="email" placeholder="Email" />
            <input v-model="password" type="password" placeholder="Mot de passe" />
            <button>Créer un compte</button>
        </form>
        <p v-if="message">{{ message }}</p>
    </div>
</template>


<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';


const API_BASE = 'http://localhost:3000';


const name = ref('');
const email = ref('');
const password = ref('');
const message = ref(null);
const router = useRouter();


async function submit() {
    try {
        const { data } = await axios.post(`${API_BASE}/signup`, { name: name.value, email: email.value, password: password.value });
        if (data.code === 'SUCCESS') {
            message.value = 'Inscription réussie. Vous pouvez vous connecter.';
            router.push('/login');
        } else {
            message.value = data.message;
        }
    } catch (e) {
        message.value = 'Erreur inscription';
    }
}
</script>