import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

import { useAuthStore } from '@/stores/auth';
import HomePage from '@/pages/home-page.vue';
import AuthPage from '@/pages/auth-page.vue';
import TestcasesPage from '@/pages/testcases-page.vue';
import TestcasePage from '@/pages/testcase-page.vue';
import TestplansPage from '@/pages/testplans-page.vue';
import DashboardLayout from '@/layouts/dashboard-layout.vue';
import { UserRole } from '@/gql/graphql';

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        component: HomePage,
    },
    {
        path: '/auth',
        component: AuthPage,
        beforeEnter: () => {
            const auth = useAuthStore();

            if (auth.isAuthenticated) {
                return { path: '/dashboard' };
            }
        },
    },
    {
        path: '/dashboard',
        component: DashboardLayout,
        beforeEnter: (to) => {
            const auth = useAuthStore();

            if (!auth.isAuthenticated) {
                return { path: '/auth' };
            }

            if (to.fullPath === '/dashboard') {
                if (auth.role === UserRole.Qa) {
                    return { path: '/dashboard/testcases' };
                } else {
                    return { path: '/dashboard/testplans' };
                }
            }
        },
        children: [
            {
                path: 'testcases',
                component: TestcasesPage,
            },
            {
                path: 'testcases/:id',
                component: TestcasePage,
            },
            {
                path: 'testplans',
                component: TestplansPage,
            },
        ],
    },
];

export const router = createRouter({
    history: createWebHistory(),
    routes,
});
