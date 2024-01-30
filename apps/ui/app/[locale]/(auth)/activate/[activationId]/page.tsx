import { Text, Title } from "@mantine/core";
import { Metadata } from "next";

import { PageLayout } from "@/components/PageLayout";

import { ActivateAccountButton } from "./ActivateAccountButton";

export const metadata: Metadata = {
  title: "Account Activation",
};

export default function Page() {
  return (
    <PageLayout>
      <Title>User Activation</Title>

      <Text>Click below to activate your account.</Text>

      <ActivateAccountButton />
    </PageLayout>
  );
}
