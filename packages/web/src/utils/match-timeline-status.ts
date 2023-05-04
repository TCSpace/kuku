import { TimelineItemProps } from 'naive-ui';
import { match } from 'ts-pattern';

import { StepStatus } from '@/gql/graphql';

export const matchTimelineStatus = (status: StepStatus): TimelineItemProps['type'] =>
    match<StepStatus, TimelineItemProps['type']>(status)
        .with(StepStatus.Success, () => 'success')
        .with(StepStatus.InProgress, () => 'info')
        .with(StepStatus.Failure, () => 'error')
        .exhaustive();
