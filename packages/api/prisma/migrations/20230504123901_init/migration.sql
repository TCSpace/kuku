-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('QA', 'ANALYST', 'MANAGER');

-- CreateEnum
CREATE TYPE "TestcaseResult" AS ENUM ('IN_PROGRESS', 'FAILURE', 'SUCCESS');

-- CreateEnum
CREATE TYPE "StepStatus" AS ENUM ('IN_PROGRESS', 'FAILURE', 'SUCCESS');

-- CreateTable
CREATE TABLE "User" (
    "username" TEXT NOT NULL,
    "role" "UserRole" NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("username")
);

-- CreateTable
CREATE TABLE "Testplan" (
    "id" TEXT NOT NULL,

    CONSTRAINT "Testplan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Testcase" (
    "id" SERIAL NOT NULL,
    "precondition" TEXT DEFAULT '',
    "postcondition" TEXT DEFAULT '',
    "comment" TEXT DEFAULT '',
    "deadline" TIMESTAMP(3),
    "testplanId" TEXT NOT NULL,
    "assigneeUsername" TEXT,

    CONSTRAINT "Testcase_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Step" (
    "id" SERIAL NOT NULL,
    "condition" TEXT DEFAULT '',
    "comment" TEXT DEFAULT '',
    "status" "StepStatus" NOT NULL DEFAULT 'IN_PROGRESS',
    "testcaseId" INTEGER NOT NULL,

    CONSTRAINT "Step_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Testcase" ADD CONSTRAINT "Testcase_testplanId_fkey" FOREIGN KEY ("testplanId") REFERENCES "Testplan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Testcase" ADD CONSTRAINT "Testcase_assigneeUsername_fkey" FOREIGN KEY ("assigneeUsername") REFERENCES "User"("username") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Step" ADD CONSTRAINT "Step_testcaseId_fkey" FOREIGN KEY ("testcaseId") REFERENCES "Testcase"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
