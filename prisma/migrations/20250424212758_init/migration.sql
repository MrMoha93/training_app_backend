-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Exercise" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,

    CONSTRAINT "Exercise_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Set" (
    "id" TEXT NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "reps" INTEGER NOT NULL,
    "exerciseId" TEXT NOT NULL,

    CONSTRAINT "Set_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Exercise" ADD CONSTRAINT "Exercise_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Session"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Set" ADD CONSTRAINT "Set_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
