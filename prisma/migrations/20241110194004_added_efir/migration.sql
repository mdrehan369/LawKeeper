-- CreateEnum
CREATE TYPE "OffenceType" AS ENUM ('Murder', 'Rape', 'Robbery', 'Burglary', 'Kidnapping', 'Dowry_Death', 'Culpable_Homicide', 'Grievous_Hurt', 'Assault', 'Extortion', 'Theft', 'Arson', 'Corruption', 'Fraudulent_Cheque_Issuance', 'Human_Trafficking', 'Unlawful_Assembly', 'Criminal_Breach_of_Trust', 'Cheating');

-- AlterTable
ALTER TABLE "PoliceOfficer" ADD COLUMN     "eFIRId" TEXT;

-- CreateTable
CREATE TABLE "Suspects" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "reason" TEXT NOT NULL,
    "eFIRId" TEXT,

    CONSTRAINT "Suspects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EFIR" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "addressId" TEXT NOT NULL,
    "incidentTime" TIMESTAMP(3) NOT NULL,
    "reportingTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "victim" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "offence" "OffenceType" NOT NULL,
    "assignedStationId" TEXT NOT NULL,
    "status" "CaseStatus" NOT NULL DEFAULT 'Open',

    CONSTRAINT "EFIR_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "EFIR_addressId_key" ON "EFIR"("addressId");

-- AddForeignKey
ALTER TABLE "PoliceOfficer" ADD CONSTRAINT "PoliceOfficer_eFIRId_fkey" FOREIGN KEY ("eFIRId") REFERENCES "EFIR"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Suspects" ADD CONSTRAINT "Suspects_eFIRId_fkey" FOREIGN KEY ("eFIRId") REFERENCES "EFIR"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EFIR" ADD CONSTRAINT "EFIR_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EFIR" ADD CONSTRAINT "EFIR_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EFIR" ADD CONSTRAINT "EFIR_assignedStationId_fkey" FOREIGN KEY ("assignedStationId") REFERENCES "PoliceStation"("id") ON DELETE CASCADE ON UPDATE CASCADE;
