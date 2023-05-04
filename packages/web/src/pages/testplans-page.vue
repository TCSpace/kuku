<template>
    <main class="flex flex-col items-centers">
        <h1 class="text-2xl mt-12 mb-4 text-center">Тест-планы</h1>
        <div class="space-y-4">
            <n-card v-for="testplan in testplans.result.value?.getTestplans" class="cursor-pointer">
                <div class="flex flex-col gap-4">
                    <div class="flex flex-row items-center gap-4">
                        <span>{{ testplan?.id }}</span>
                    </div>
                    <n-card
                        v-for="testcase in testplan.testcases"
                        class="cursor-pointer"
                        @click="router.push({ path: `/dashboard/testcases/${testcase.id}` })"
                    >
                        <div class="flex flex-row items-center justify-between">
                            <div class="flex flex-row items-center gap-4">
                                <span>{{ testcase.testplan?.id }} # {{ testcase.id }}</span>
                                <n-icon
                                    v-if="testcase.status?.value"
                                    :size="28"
                                    :component="matchStatusIcon(testcase.status?.value)"
                                />
                            </div>
                            <n-timeline
                                class="flex flex-row items-center justify-center w-fit"
                                horizontal
                            >
                                <template v-for="step in testcase.steps">
                                    <n-timeline-item
                                        v-if="step.status"
                                        :type="matchTimelineStatus(step.status)"
                                    />
                                </template>
                            </n-timeline>
                            <div class="flex flex-row items-center gap-4">
                                <span v-if="testcase.deadline">{{ testcase.deadline }}</span>
                                <span v-if="testcase.assignee?.username" class="text-lg">
                                    {{ testcase.assignee?.username }}
                                </span>
                                <span v-else> Не назначен </span>
                                <n-avatar round size="small">
                                    {{ testcase.assignee?.username ?? '' }}
                                </n-avatar>
                            </div>
                        </div>
                    </n-card>
                </div>
            </n-card>
        </div>
    </main>
</template>

<script setup lang="ts">
import { watchEffect } from 'vue';
import { useQuery } from '@vue/apollo-composable';
import { useRouter } from 'vue-router';
import { useLoadingBar, NCard, NAvatar, NIcon, NTimeline, NTimelineItem } from 'naive-ui';

import { graphql } from '@/gql';
import { matchStatusIcon } from '@/utils/match-status-icon';
import { matchTimelineStatus } from '@/utils/match-timeline-status';

const getTestplansQuery = graphql(/* GraphQL */ `
    query getTestplansForList {
        getTestplans {
            id
            testcases {
                id
                status {
                    value
                }
                testplan {
                    id
                }
                assignee {
                    username
                }
                deadline
                steps {
                    status
                }
            }
        }
    }
`);

const loadingBar = useLoadingBar();
const router = useRouter();

const testplans = useQuery(getTestplansQuery);

watchEffect(() => {
    if (testplans.loading.value) {
        loadingBar.start();
    } else {
        loadingBar.finish();
    }
});
</script>
