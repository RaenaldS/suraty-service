/*
  Warnings:

  - Made the column `user_level` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `users` MODIFY `user_level` INTEGER NOT NULL;
