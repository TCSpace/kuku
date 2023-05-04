import { createApp, h, provide } from 'vue';
import { DefaultApolloClient } from '@vue/apollo-composable';
import { createPinia } from 'pinia';

import { apolloClient } from '@/api/graphql';
import { router } from '@/router';
import App from '@/app.vue';

import './style.css';

createApp({
    setup: () => {
        provide(DefaultApolloClient, apolloClient);
    },
    render: () => h(App),
})
    .use(router)
    .use(createPinia())
    .mount('#app');
