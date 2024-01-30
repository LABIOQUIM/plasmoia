"use client";
import { Avatar, Box, Paper, Title } from "@mantine/core";

import fernandoImg from "@/assets/maintainers/fernando.jpg";
import ivoImg from "@/assets/maintainers/ivo.jpg";
import railtonImg from "@/assets/maintainers/railton.jpeg";
import { Logo } from "@/components/Logo";
import { PageLayout } from "@/components/PageLayout";

import mClasses from "./Maintainers.module.css";

export default async function Home() {
  const maintainers = [
    {
      name: "Dr. Fernando B. Zanchi",
      photo: fernandoImg,
    },
    {
      name: "Railton Marques de Souza Guimarães",
      photo: railtonImg,
    },
    {
      name: "Ivo Vieira",
      photo: ivoImg,
    },
  ];

  return (
    <PageLayout>
      <Logo />
      <Title mt="md" order={4}>
        PlasmoQSAR is maintained by
      </Title>

      <Box className={mClasses.container}>
        {maintainers.map((maintainer) => (
          <Paper
            className={mClasses.paperContainer}
            key={maintainer.name}
            withBorder
          >
            <Avatar src={maintainer.photo.src} size="lg" />
            <Title order={5} ta="center">
              {maintainer.name}
            </Title>
          </Paper>
        ))}
      </Box>
    </PageLayout>
  );
}
