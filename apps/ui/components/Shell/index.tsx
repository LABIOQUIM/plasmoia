"use client";
import { PropsWithChildren } from "react";
import { AppShell, Box, Burger, Group } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import dynamic from "next/dynamic";

import { LoadingBox } from "@/components/LoadingBox";
import { Logo } from "@/components/Logo";

import { Footer } from "./Footer";

import classes from "./Shell.module.css";

const Navbar = dynamic(
  () => import("@/components/Navbar").then((mod) => mod.Navbar),
  {
    loading: LoadingBox,
    ssr: false,
  }
);

const ThemeToggle = dynamic(
  () => import("@/components/ThemeToggle").then((mod) => mod.ThemeToggle),
  {
    ssr: false,
  }
);

interface Props {
  session: any;
}

export function Shell({ session, children }: PropsWithChildren<Props>) {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Group align="center" justify="space-between" h="100%" w="100%" px="md">
          <Group>
            <Burger
              opened={opened}
              onClick={toggle}
              hiddenFrom="sm"
              size="sm"
            />
            <Logo />
          </Group>
          <Group>
            <Box visibleFrom="sm">
              <ThemeToggle />
            </Box>
          </Group>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar px="md">
        <Navbar toggle={toggle} session={session} />
      </AppShell.Navbar>
      <AppShell.Main
        styles={{
          main: {
            display: "flex",
            flexDirection: "column",
            flex: 1,
          },
        }}
      >
        <Box
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
          }}
        >
          {children}
        </Box>
        <AppShell.Footer className={classes.footer}>
          <Footer />
        </AppShell.Footer>
      </AppShell.Main>
    </AppShell>
  );
}
