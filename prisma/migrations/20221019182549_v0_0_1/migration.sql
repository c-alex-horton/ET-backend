-- CreateTable
CREATE TABLE "Entry" (
    "id" SERIAL NOT NULL,
    "event" TEXT NOT NULL,
    "emotion" TEXT NOT NULL,
    "symbol" TEXT NOT NULL,
    "description" TEXT,
    "notes" TEXT,
    "starred" BOOLEAN NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Entry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tag" (
    "name" TEXT NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("name")
);

-- AddForeignKey
ALTER TABLE "Entry" ADD CONSTRAINT "Entry_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
