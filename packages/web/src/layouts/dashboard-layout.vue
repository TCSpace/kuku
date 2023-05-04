<template>
    <n-layout class="h-full" has-sider>
        <n-layout-sider
            :width="240"
            :show-collapsed-content="false"
            :collapsed-width="24"
            bordered
            show-trigger="arrow-circle"
            collapse-mode="transform"
        >
            <n-list class="h-full" bordered>
                <template #header>
                    <div class="flex flex-row justify-between items-center">
                        <div class="flex flex-col gap-2">
                            <span class="text-3xl">{{ auth.username }}</span>
                            <span class="text-md font-semibold">
                                {{ auth.displayRole }}
                            </span>
                        </div>
                        <n-avatar round size="large">
                            {{ auth.username }}
                        </n-avatar>
                    </div>
                </template>
                <template #footer>
                    <n-button @click="signOut">Выйти</n-button>
                </template>
            </n-list>
        </n-layout-sider>
        <router-view class="h-full w-full p-4" />
    </n-layout>
</template>

<script setup lang="ts">
import { watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import {
    NLayout,
    NLayoutSider,
    NList,
    NListItem,
    NAvatar,
    NIcon,
    NButton,
} from 'naive-ui';

import { useAuthStore } from '@/stores/auth';
import { UserRole } from '@/gql/graphql';
import { matchStatusIcon } from '@/utils/match-status-icon';

const auth = useAuthStore();
const router = useRouter();
const route = useRoute();

const signOut = () => {
    auth.signOut();
    router.push('/auth');
};
</script>
