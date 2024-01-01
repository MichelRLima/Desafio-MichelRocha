-- CreateEnum
CREATE TYPE "Bimestre" AS ENUM ('PRIMEIRO', 'SEGUNDO', 'TERCEIRO', 'QUARTO');

-- CreateEnum
CREATE TYPE "Disciplina" AS ENUM ('Biologia', 'Artes', 'Geografia', 'Sociologia');

-- CreateTable
CREATE TABLE "resultado" (
    "id" TEXT NOT NULL,
    "bimestre" "Bimestre" NOT NULL,
    "disciplina" "Disciplina" NOT NULL,
    "nota" DOUBLE PRECISION NOT NULL,
    "criadoEm" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "resultado_pkey" PRIMARY KEY ("id")
);
