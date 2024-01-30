import { Alert, Box, SimpleGrid, Title } from "@mantine/core";
import { Metadata } from "next";
import dynamic from "next/dynamic";
import { redirect } from "next/navigation";

import { PageLayout } from "@/components/PageLayout";
import { getSession } from "@/hooks/getSession";

import classes from "./Login.module.css";

const LoginForm = dynamic(() => import("./LoginForm"), {
  ssr: false,
});

export const metadata: Metadata = {
  title: "Login",
};

interface Props {
  searchParams: {
    reason: "unauthenticated";
  };
}

export default async function Page({ searchParams }: Props) {
  const session = await getSession();

  if (session) redirect("/new-submission");

  return (
    <PageLayout>
      <Title>Login</Title>
      <SimpleGrid cols={{ base: 1, lg: 2 }}>
        <Box className={classes.formContainer}>
          {searchParams.reason === "unauthenticated" && (
            <Alert
              color="orange"
              title="You must be authenticated to use this feature."
            />
          )}
          <LoginForm />
        </Box>
        <Box>{/* Maybe an image here */}</Box>
      </SimpleGrid>
    </PageLayout>
  );
}
