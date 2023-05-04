import { PrismaClient, StepStatus, UserRole } from '@prisma/client';

const prisma = new PrismaClient();

const main = async () => {
    await prisma.$transaction([
        prisma.user.create({
            data: { username: 'qa1', role: UserRole.QA },
        }),
        prisma.user.create({
            data: { username: 'manager1', role: UserRole.MANAGER },
        }),
        prisma.user.create({
            data: { username: 'analyst1', role: UserRole.ANALYST },
        }),
    ]);

    await prisma.$transaction([
        prisma.testplan.create({
            data: { id: 'TICKET-1' },
        }),
        prisma.testplan.create({
            data: { id: 'TICKET-2' },
        }),
        prisma.testplan.create({
            data: { id: 'TICKET-3' },
        }),
    ]);

    await prisma.$transaction([
        prisma.testcase.create({
            data: {
                id: 1,
                testplanId: 'TICKET-1',
                precondition: 'Заполнить базу данных из seed-файла',
                postcondition: 'Прогнать e2e после всех проверок еще раз',
                comment: 'Скриншотные тесты могут флапать, перезапускай',
                assigneeUsername: 'qa1',
                deadline: new Date(1683549773963),
            },
        }),
        prisma.step.create({
            data: {
                testcaseId: 1,
                condition: 'Контейнеры запустились',
                status: StepStatus.SUCCESS,
            },
        }),
        prisma.step.create({
            data: {
                testcaseId: 1,
                condition: 'Открыть страницу покупки',
                status: StepStatus.SUCCESS,
            },
        }),
        prisma.step.create({
            data: {
                testcaseId: 1,
                condition: 'Перейти к оплате',
                status: StepStatus.FAILURE,
                comment: 'Кнопка "купить" не отображается',
            },
        }),
        prisma.step.create({
            data: {
                testcaseId: 1,
                condition: 'Проверить что заказ есть в админке',
                status: StepStatus.IN_PROGRESS,
            },
        }),
    ]);

    await prisma.$transaction([
        prisma.testcase.create({
            data: {
                id: 2,
                testplanId: 'TICKET-2',
                precondition: 'Позови меня, я тоже посмотреть хочу',
                postcondition: 'Прогнать e2e после всех проверок еще раз',
                comment: 'Скриншотные тесты могут флапать, перезапускай',
                assigneeUsername: 'qa1',
                deadline: new Date(1683549773963),
            },
        }),
        prisma.step.create({
            data: {
                testcaseId: 2,
                condition: 'Контейнеры запустились',
                status: StepStatus.IN_PROGRESS,
            },
        }),
        prisma.step.create({
            data: {
                testcaseId: 2,
                condition: 'Открыть страницу покупки',
                status: StepStatus.IN_PROGRESS,
            },
        }),
        prisma.step.create({
            data: {
                testcaseId: 2,
                condition: 'Перейти к оплате',
                status: StepStatus.IN_PROGRESS,
                comment: 'Кнопка "купить" не отображается',
            },
        }),
        prisma.step.create({
            data: {
                testcaseId: 2,
                condition: 'Проверить что заказ есть в админке',
                status: StepStatus.IN_PROGRESS,
            },
        }),
        prisma.testcase.create({
            data: {
                id: 3,
                testplanId: 'TICKET-2',
                precondition: 'Поставь приложение с новыми версиями пакетов',
                postcondition: 'Приложи скриншоты в жиру',
                comment: 'Да все в целом должно быть ок',
                assigneeUsername: 'qa1',
                deadline: new Date(1683549773963),
            },
        }),
        prisma.step.create({
            data: {
                testcaseId: 3,
                condition: 'Контейнеры запустились',
                status: StepStatus.SUCCESS,
            },
        }),
        prisma.step.create({
            data: {
                testcaseId: 3,
                condition: 'Хеллоу ворлд отобразился',
                status: StepStatus.SUCCESS,
            },
        }),
    ]);
};

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (error) => {
        console.error(error);
        await prisma.$disconnect();
        process.exit(1);
    });
