/*
  Warnings:

  - Added the required column `reason` to the `LicenseApplication` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "LicenseApplication" ADD COLUMN     "reason" TEXT NOT NULL;
