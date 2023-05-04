<template>
    <n-loading-bar-provider>
        <router-view class="w-full h-full" />
    </n-loading-bar-provider>
</template>

<script setup lang="ts">
import { watchEffect } from 'vue';
import { RouterView, useRouter, useRoute } from 'vue-router';
import { NLoadingBarProvider } from 'naive-ui';

import { useAuthStore } from '@/stores/auth';

const router = useRouter();
const route = useRoute();
const auth = useAuthStore();

const unwatch = watchEffect(() => {
    if (auth.isAuthenticated) {
        if (auth.role !== undefined) {
            if (route.fullPath === '/') {
                router.push({ path: '/dashboard', force: true });
            }
            unwatch();
        }
    } else {
        router.push({ path: '/auth', force: true });
    }
});
</script>
