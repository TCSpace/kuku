import { computed, ref, watchEffect } from 'vue';
import { defineStore } from 'pinia';
import { match } from 'ts-pattern';

import { User, UserRole } from '@/gql/graphql';
import { graphql } from '@/gql';
import { apolloClient } from '@/api/graphql';

const getMeQuery = graphql(/* GraphQL */ `
    query getMe {
        getMe {
            username
            role
        }
    }
`);

const signInMutation = graphql(/* GraphQL */ `
    mutation signIn($username: String!) {
        signIn(username: $username)
    }
`);

export const useAuthStore = defineStore('auth', () => {
    const user = ref<User | null>(null);

    const fetchUser = async () => {
        const {
            data: { getMe },
        } = await apolloClient.query({ query: getMeQuery });

        user.value = getMe;
    };

    const signIn = async (username: string) => {
        const { data } = await apolloClient.mutate({
            mutation: signInMutation,
            variables: { username },
        });

        if (data?.signIn) {
            localStorage.setItem('bearer', data.signIn);
        }

        await fetchUser();
    };

    const token = localStorage.getItem('bearer');

    if (token) {
        fetchUser();
    }

    const isAuthenticated = computed(
        () => user.value !== null || token !== null
    );
    const username = computed(() => user.value?.username);
    const role = computed(() => user.value?.role);

    const displayRole = computed(() =>
        match(user.value?.role)
            .with(UserRole.Qa, () => 'QA-инженер')
            .with(UserRole.Analyst, () => 'Аналитик')
            .with(UserRole.Manager, () => 'Менеджер')
            .with(undefined, () => '')
            .exhaustive()
    );

    return { username, role, displayRole, isAuthenticated, signIn, fetchUser };
});
