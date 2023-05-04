<template>
    <main class="flex flex-grow flex-col items-center justify-center p-4">
        <h1 class="text-3xl pb-4">Вход</h1>
        <n-card class="max-w-xs">
            <n-form>
                <n-form-item label="Логин">
                    <n-input v-model:value="username" placeholder="Логин" />
                </n-form-item>
            </n-form>
            <n-button
                size="large"
                :loading="isLoading"
                :disabled="isLoading || username.length < 1"
                @click="submit"
            >
                Войти
            </n-button>
        </n-card>
    </main>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { NForm, NCard, NFormItem, NInput, NButton, useLoadingBar } from 'naive-ui';
import { useQuery } from '@vue/apollo-composable';

import { useAuthStore } from '@/stores/auth';
import { graphql } from '@/gql';

const auth = useAuthStore();
const loadingBar = useLoadingBar();

const username = ref('');
const isLoading = ref(false);

const submit = async () => {
    loadingBar.start();
    isLoading.value = true;
    await auth.signIn(username.value);
    loadingBar.finish();
    isLoading.value = false;
};
</script>
