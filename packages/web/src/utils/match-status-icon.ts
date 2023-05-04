import { match } from 'ts-pattern';
import {
    CheckmarkCircle20Regular,
    DismissCircle20Regular,
    MoreCircle20Regular,
} from '@vicons/fluent';
import { StepStatus, TestcaseStatus } from '@/gql/graphql';

export const matchStatusIcon = (status: TestcaseStatus | StepStatus) =>
    match(status)
        .with(TestcaseStatus.InProgress, () => MoreCircle20Regular)
        .with(StepStatus.InProgress, () => MoreCircle20Regular)
        .with(TestcaseStatus.Success, () => CheckmarkCircle20Regular)
        .with(StepStatus.Success, () => CheckmarkCircle20Regular)
        .with(TestcaseStatus.Failure, () => DismissCircle20Regular)
        .with(StepStatus.Failure, () => DismissCircle20Regular)
        .exhaustive();
