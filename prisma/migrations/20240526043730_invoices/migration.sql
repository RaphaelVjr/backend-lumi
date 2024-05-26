-- CreateTable
CREATE TABLE "invoices" (
    "id" INTEGER NOT NULL,
    "numero_cliente" TEXT NOT NULL,
    "mes_referencia" TEXT NOT NULL,
    "energia_eletrica_quantidade" DOUBLE PRECISION NOT NULL,
    "energia_eletrica_valor" DOUBLE PRECISION NOT NULL,
    "energia_scee_quantidade" DOUBLE PRECISION NOT NULL,
    "energia_scee_valor" DOUBLE PRECISION NOT NULL,
    "energia_compensada_quantidade" DOUBLE PRECISION NOT NULL,
    "energia_compensada_valor" DOUBLE PRECISION NOT NULL,
    "contrib_ilum_publica" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "invoices_pkey" PRIMARY KEY ("id")
);
