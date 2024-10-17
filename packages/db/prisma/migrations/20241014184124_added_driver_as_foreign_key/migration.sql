-- AddForeignKey
ALTER TABLE "online" ADD CONSTRAINT "online_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "Driver"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
