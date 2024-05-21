-- CreateTable
CREATE TABLE "Fatura" (
    "id" SERIAL NOT NULL,
    "cliente" TEXT NOT NULL,
    "mesReferencia" TEXT NOT NULL,
    "energiaEletrica" JSONB NOT NULL,
    "energiaSCEEE" JSONB NOT NULL,
    "energiaCompensada" JSONB NOT NULL,
    "contribIlumPublica" JSONB NOT NULL,

    CONSTRAINT "Fatura_pkey" PRIMARY KEY ("id")
);
