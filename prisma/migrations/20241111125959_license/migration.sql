/*
  Warnings:

  - You are about to drop the column `citizenId` on the `LicenseApplication` table. All the data in the column will be lost.
  - The `status` column on the `LicenseApplication` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `userId` to the `LicenseApplication` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `type` on the `LicenseApplication` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "LicenseType" AS ENUM ('Firearm', 'Driving', 'Liquor', 'Private_Security', 'Event_Entertainment', 'Pet', 'Import_Export', 'Knife_Blade', 'Protest', 'Hunting', 'Restricted_Area');

-- CreateEnum
CREATE TYPE "LicenseStatus" AS ENUM ('Pending', 'Reviewing', 'Issued');

-- DropForeignKey
ALTER TABLE "LicenseApplication" DROP CONSTRAINT "LicenseApplication_citizenId_fkey";

-- AlterTable
ALTER TABLE "Address" ALTER COLUMN "type" SET DEFAULT 'CurrentAddress';

-- AlterTable
ALTER TABLE "LicenseApplication" DROP COLUMN "citizenId",
ADD COLUMN     "approved" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "policeOfficerUserId" TEXT,
ADD COLUMN     "userId" TEXT NOT NULL,
DROP COLUMN "type",
ADD COLUMN     "type" "LicenseType" NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" "LicenseStatus" NOT NULL DEFAULT 'Pending';

-- AddForeignKey
ALTER TABLE "LicenseApplication" ADD CONSTRAINT "LicenseApplication_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LicenseApplication" ADD CONSTRAINT "LicenseApplication_policeOfficerUserId_fkey" FOREIGN KEY ("policeOfficerUserId") REFERENCES "PoliceOfficer"("userId") ON DELETE SET NULL ON UPDATE CASCADE;
