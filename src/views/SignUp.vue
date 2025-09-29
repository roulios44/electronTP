<template>
    <div class="uk-container">
        <h1>Inscription</h1>
        <form @submit.prevent="submit" class="uk-form-stacked">
            <div class="uk-margin">
                <input v-model="email" type="email" class="uk-input" placeholder="Email" required />
            </div>
            <div class="uk-margin">
                <input v-model="password" type="password" class="uk-input" placeholder="Mot de passe" required />
            </div>
            <div class="uk-margin">
                <input v-model="confirmPassword" type="password" class="uk-input" placeholder="Confirmer mot de passe"
                    required />
            </div>
            <div class="uk-margin">
                <input v-model="pseudo" type="text" class="uk-input" placeholder="Pseudo" required />
            </div>
            <div class="uk-margin">
                <input v-model="cityCode" type="text" class="uk-input" placeholder="Code postal" required />
            </div>
            <div class="uk-margin">
                <input v-model="city" type="text" class="uk-input" placeholder="Ville" required />
            </div>
            <div class="uk-margin">
                <input v-model="phone" type="tel" class="uk-input" placeholder="Téléphone" required />
            </div>
            <button type="submit" class="uk-button uk-button-primary">Créer un compte</button>
        </form>
        <p v-if="message" :class="{ 'uk-text-success': success, 'uk-text-danger': !success }">{{ message }}</p>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const API_BASE = 'http://localhost:3000';

const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const pseudo = ref('');
const cityCode = ref('');
const city = ref('');
const phone = ref('');

const message = ref('');
const success = ref(false);
const router = useRouter();

async function submit() {
    message.value = '';
    success.value = false;

    if (password.value !== confirmPassword.value) {
        message.value = 'Les mots de passe ne correspondent pas.';
        return;
    }

    try {
        const { data } = await axios.post(`${API_BASE}/signup`, {
            email: email.value,
            password: password.value,
            passwordConfirm: confirmPassword.value,
            pseudo: pseudo.value,
            cityCode: cityCode.value,
            city: city.value,
            phone: phone.value
        });

        if (data.code === '200') {
            message.value = 'Inscription réussie. Vous pouvez vous connecter.';
            success.value = true;
            router.push('/login');
        } else {
            message.value = data.message;
        }
    } catch (e) {
        message.value = 'Erreur inscription';
    }
}
</script>
