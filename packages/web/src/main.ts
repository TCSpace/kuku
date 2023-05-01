import { createApp, h, provide } from 'vue';
import { DefaultApolloClient } from '@vue/apollo-composable';

import { apolloClient } from './api/graphql';
import App from './App.vue';

import './style.css';

createApp({
    setup: () => {
        provide(DefaultApolloClient, apolloClient);
    },
    render: () => h(App),
}).mount('#app');
