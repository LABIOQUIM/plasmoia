-- CreateTable
CREATE TABLE "cells" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "is_infected" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "cells_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "cells_id_key" ON "cells"("id");

-- AddForeignKey
ALTER TABLE "cells" ADD CONSTRAINT "cells_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
