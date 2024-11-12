-- AlterTable
ALTER TABLE "LicenseApplication" ADD COLUMN     "assignedStationId" TEXT;

-- AddForeignKey
ALTER TABLE "LicenseApplication" ADD CONSTRAINT "LicenseApplication_assignedStationId_fkey" FOREIGN KEY ("assignedStationId") REFERENCES "PoliceStation"("id") ON DELETE SET NULL ON UPDATE CASCADE;
