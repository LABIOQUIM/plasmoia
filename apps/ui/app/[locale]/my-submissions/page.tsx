import { Box, Title } from "@mantine/core";
import { IconApiOff } from "@tabler/icons-react";
import Image from "next/image";
import { redirect } from "next/navigation";

import { PageLayout } from "@/components/PageLayout";

import { getUserSubmissions } from "./getUserSubmissions";

import classes from "./page.module.css";

export default async function Page() {
  const submissions = await getUserSubmissions();

  if (submissions === "no-session") {
    redirect("/login?reason=unauthenticated");
  }

  return (
    <PageLayout>
      <Title>My Submissions</Title>
      {submissions === "failed" ? (
        <Box className={classes.failureContainer}>
          <IconApiOff size={48} />
          <Title order={2}>Failed to connect to server</Title>
        </Box>
      ) : (
        <Box className={classes.submissionsContainer}>
          {submissions.map((s) => (
            <Box className={classes.submissionContainer} key={s.id}>
              <Image
                alt="Cell Image"
                className={classes.submissionImage}
                height={64}
                src={s.image}
                width={64}
              />
              <Box className={classes.submissionDetails}>
                <Title order={4}>{s.description}</Title>
                <Title
                  order={5}
                  style={{
                    color: s.isInfected ? "red" : "green",
                  }}
                >
                  {s.isInfected ? "INFECTED" : "NOT INFECTED"}
                </Title>
              </Box>
            </Box>
          ))}
        </Box>
      )}
    </PageLayout>
  );
}

export const dynamic = "force-dynamic";
