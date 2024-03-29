import { Box, SimpleGrid, Title } from "@mantine/core";
import { Metadata } from "next";
import dynamic from "next/dynamic";
import { redirect } from "next/navigation";

import { PageLayout } from "@/components/PageLayout";
import { getSession } from "@/hooks/getSession";

const RegisterForm = dynamic(() => import("./RegisterForm"), {
  ssr: false,
});

export const metadata: Metadata = {
  title: "Register",
};

export default async function Page() {
  const session = await getSession();
  if (session) redirect("/new-submission");

  return (
    <PageLayout>
      <Title>Register</Title>
      <SimpleGrid cols={{ base: 1, lg: 2 }}>
        <RegisterForm />
        <Box>{/* Maybe an image here */}</Box>
      </SimpleGrid>
    </PageLayout>
  );
}
