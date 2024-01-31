"use server";

import { prisma } from "database";

import { getSession } from "@/hooks/getSession";

export async function getUserSubmissions() {
  try {
    const session = await getSession();

    if (!session) {
      return "no-session";
    }

    const userId = session.user.id;

    const submissions = await prisma.cell.findMany({
      where: {
        userId: { equals: userId },
      },
      take: 10,
      orderBy: {
        createdAt: "desc",
      },
    });

    return submissions;
  } catch {
    return "failed";
  }
}
