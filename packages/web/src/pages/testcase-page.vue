<template>
    <n-card v-if="testcase">
        <div class="flex flex-col gap-4">
            <div class="flex flex-row items-center gap-2">
                <h1 class="text-xl">
                    Тесткейс {{ testcase.testplan?.id }} #{{ testcase.id }}
                </h1>
                <n-icon
                    v-if="testcase.status?.value"
                    :size="32"
                    :component="matchStatusIcon(testcase.status?.value)"
                />
            </div>
            <div class="flex flex-row items-center gap-4 text-lg">
                <span>Назначен: {{ testcase.assignee?.username }}</span>
                <n-avatar round size="small">
                    {{ testcase.assignee?.username }}
                </n-avatar>
                <n-date-picker
                    v-if="auth.role !== UserRole.Qa"
                    type="datetime"
                    v-model:value="deadline"
                />
            </div>
            <n-alert type="info">
                <template #header>
                    <div class="flex flex-row items-center gap-2">
                        <span>Пре-условие</span>
                        <div
                            class="cursor-pointer"
                            @click="togglePreconditionEdit"
                        >
                            <n-icon
                                v-if="auth.role !== UserRole.Qa"
                                size="16"
                                :component="
                                    precondition === null
                                        ? Edit20Regular
                                        : Save20Regular
                                "
                            />
                        </div>
                    </div>
                </template>
                <template v-if="precondition === null" #default>
                    {{ testcase.precondition }}
                </template>
                <template v-else #default>
                    <n-input v-model:value="precondition" type="textarea" />
                </template>
            </n-alert>
            <n-timeline>
                <template v-for="(step, idx) in steps">
                    <n-timeline-item
                        v-if="step.status"
                        :type="matchTimelineStatus(step.status)"
                        :title="`Шаг #${idx + 1}`"
                        :time="step.comment ?? ''"
                        :content="step.condition ?? ''"
                    >
                        <template #icon>
                            <n-dropdown
                                trigger="click"
                                :options="statusDropdownOptions"
                                @select="
                                    (status) =>
                                        changeStepStatus(step.id, status)
                                "
                            >
                                <n-icon
                                    :size="20"
                                    :component="matchStatusIcon(step.status)"
                                />
                            </n-dropdown>
                        </template>
                    </n-timeline-item>
                </template>
            </n-timeline>
            <n-alert type="info">
                <template #header>
                    <div class="flex flex-row items-center gap-2">
                        <span>Пост-условие</span>
                        <div class="cursor-pointer">
                            <n-icon
                                v-if="auth.role !== UserRole.Qa"
                                size="16"
                                :component="Edit20Regular"
                            />
                        </div>
                    </div>
                </template>
                <template #default>
                    {{ testcase.postcondition }}
                </template>
            </n-alert>
            <n-alert type="info">
                <template #header>
                    <div class="flex flex-row items-center gap-2">
                        <span>Комментарий</span>
                        <div class="cursor-pointer">
                            <n-icon
                                v-if="auth.role !== UserRole.Qa"
                                size="16"
                                :component="Edit20Regular"
                            />
                        </div>
                    </div>
                </template>
                <template #default>
                    {{ testcase.comment }}
                </template>
            </n-alert>
        </div>
    </n-card>
</template>

<script setup lang="ts">
import { watchEffect, computed, ref, h, Component } from 'vue';
import { useRoute } from 'vue-router';
import { useMutation, useQuery } from '@vue/apollo-composable';
import {
    useLoadingBar,
    NCard,
    NAlert,
    NTimeline,
    NTimelineItem,
    NAvatar,
    NIcon,
    NDatePicker,
    NButton,
    NInput,
    NDropdown,
    DropdownOption,
} from 'naive-ui';
import { Edit20Regular, Save20Regular } from '@vicons/fluent';

import { graphql } from '@/gql';
import { matchTimelineStatus } from '@/utils/match-timeline-status';
import { matchStatusIcon } from '@/utils/match-status-icon';
import { StepStatus, UserRole } from '@/gql/graphql';
import { useAuthStore } from '@/stores/auth';

const getTestcaseQuery = graphql(/* GraphQL */ `
    query getTestcaseForPage($id: Int!) {
        getTestcaseById(id: $id) {
            id
            testplan {
                id
            }
            status {
                value
            }
            precondition
            postcondition
            comment
            steps {
                id
                status
                condition
                comment
            }
            deadline
            assignee {
                username
                role
            }
        }
    }
`);

const editTestcaseMutate = graphql(/* GraphQL */ `
    mutation editTestcase($input: UpdateTestcaseInput!) {
        updateTestcase(input: $input) {
            id
        }
    }
`);

const editTestcaseForQAMutate = graphql(/* GraphQL */ `
    mutation editTestcaseForQA($input: UpdateTestcaseForQAInput!) {
        updateTestcaseForQA(input: $input) {
            id
        }
    }
`);

const editStepForQAMutate = graphql(/* GraphQL */ `
    mutation addCommentForStep($input: UpdateStepForQAInput!) {
        updateStepForQA(input: $input) {
            id
        }
    }
`);

const renderIcon = (icon: Component) => {
    return () => {
        return h(NIcon, null, {
            default: () => h(icon),
        });
    };
};

const statusDropdownOptions: DropdownOption[] = [
    {
        key: StepStatus.InProgress,
        icon: renderIcon(matchStatusIcon(StepStatus.InProgress)),
        label: 'В прогрессе',
    },
    {
        key: StepStatus.Success,
        icon: renderIcon(matchStatusIcon(StepStatus.Success)),
        label: 'Успешно',
    },
    {
        key: StepStatus.Failure,
        icon: renderIcon(matchStatusIcon(StepStatus.Failure)),
        label: 'Провалено',
    },
];

const auth = useAuthStore();
const route = useRoute();
const loadingBar = useLoadingBar();

const testcaseId = route.params['id'] as string;

const deadline = ref<number | null>(null);
const precondition = ref<string | null>(null);

const query = useQuery(getTestcaseQuery, { id: Number(testcaseId) });
query.onResult((result) => {
    if (result.data.getTestcaseById?.deadline) {
        deadline.value = Number(new Date(result.data.getTestcaseById.deadline));
    }
});

const { mutate: mutateTestcaseForQA } = useMutation(editTestcaseForQAMutate);
const { mutate: mutateTestcase } = useMutation(editTestcaseMutate);

const { mutate: mutateStepForQA } = useMutation(editStepForQAMutate);

watchEffect(() => {
    if (query.loading.value) {
        loadingBar.start();
    } else {
        loadingBar.finish();
    }
});

const testcase = computed(() => query.result.value?.getTestcaseById);

const steps = computed(() => {
    const copy = [...(testcase.value?.steps ?? [])];
    return copy.sort((a, b) => a.id - b.id);
});

const togglePreconditionEdit = async () => {
    if (precondition.value === null) {
        precondition.value = testcase.value?.precondition ?? '';
    } else {
        loadingBar.start();
        await mutateTestcase({
            input: {
                testcaseId: Number(testcaseId),
                precondition: precondition.value,
            },
        });
        await query.refetch();
        loadingBar.finish();
        precondition.value = null;
    }
};

const changeStepStatus = async (stepId: number, status: StepStatus) => {
    console.log(stepId, status);
    if (auth.role === UserRole.Qa) {
        loadingBar.start();
        await mutateStepForQA({ input: { stepId, status } });
        await query.refetch();
        loadingBar.finish();
    }
};
</script>
