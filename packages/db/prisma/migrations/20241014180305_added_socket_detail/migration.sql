-- CreateTable
CREATE TABLE "online" (
    "id" SERIAL NOT NULL,
    "driverId" INTEGER NOT NULL,
    "socketId" TEXT NOT NULL,

    CONSTRAINT "online_pkey" PRIMARY KEY ("id")
);
