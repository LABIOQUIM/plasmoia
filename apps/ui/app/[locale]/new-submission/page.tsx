import { Title } from "@mantine/core";
import { Metadata } from "next";
import { redirect } from "next/navigation";

import { PageLayout } from "@/components/PageLayout";
import { getSession } from "@/hooks/getSession";

import { SubmissionForm } from "./SubmissionForm";

export const metadata: Metadata = {
  title: "New Submission",
};

export default async function Page() {
  const session = await getSession();

  if (!session) {
    redirect("/login?reason=unauthenticated");
  }

  return (
    <PageLayout>
      <Title>New Submission</Title>
      <Title order={4}>
        Choose a image, crop it so just one ROI (Region of Interest) is
        processed and submit it.
      </Title>
      <SubmissionForm />
    </PageLayout>
  );
}
