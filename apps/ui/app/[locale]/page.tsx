"use client";
import { Avatar, Box, List, Paper, Text, Title } from "@mantine/core";
import Link from "next/link";

import fernandoImg from "@/assets/maintainers/fernando.jpg";
import ivoImg from "@/assets/maintainers/ivo.jpg";
import jonathanImg from "@/assets/maintainers/jonathan.gif";
import rosimarImg from "@/assets/maintainers/rosimar.png";
import { Logo } from "@/components/Logo";
import { PageLayout } from "@/components/PageLayout";

import mClasses from "./Maintainers.module.css";

export default async function Home() {
  const maintainers = [
    {
      name: "Dr. Fernando B. Zanchi",
      photo: fernandoImg,
      lattes: "https://lattes.cnpq.br/0564343474986429",
    },
    {
      name: "Dr. Jonathan da Silva Ramos",
      photo: jonathanImg,
      lattes: "https://lattes.cnpq.br/9821082332703697",
    },
    {
      name: "Rosimar Pires Esquerdo",
      photo: rosimarImg,
      lattes: "https://lattes.cnpq.br/8747418814745039",
    },
    {
      name: "Ivo Henrique Provensi Vieira",
      photo: ivoImg,
      lattes: "https://lattes.cnpq.br/5130583751808996",
    },
  ];

  return (
    <PageLayout>
      <Logo />

      <Text>
        PlasmoIA is a web interface that utilizes artificial intelligence to
        detect Plasmodium Vivax in images of Malaria laboratorial exams.
      </Text>

      <List type="ordered">
        <List.Item>
          Ramos JdS, Vieira IHP, Rocha WS, Esquerdo RP, Watanabe CYV, et al.
          (2024) A transfer learning approach to identify Plasmodium in
          microscopic images. PLOS Computational Biology 20(8): e1012327.{" "}
          <Link
            target="__blank"
            href="https://doi.org/10.1371/journal.pcbi.1012327"
          >
            https://doi.org/10.1371/journal.pcbi.1012327
          </Link>
        </List.Item>
      </List>

      <Title mt="md" order={4}>
        PlasmoIA is maintained by
      </Title>

      <Box className={mClasses.container}>
        {maintainers.map((maintainer) => (
          <Paper
            className={mClasses.paperContainer}
            component={Link}
            href={maintainer.lattes}
            target="_blank"
            referrerPolicy="no-referrer"
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

      <Title mt="mt" order={4}>
        Contact
      </Title>
      <Text>
        If needed you can contact{" "}
        <Link href="mailto:fernando.zanchi@fiocruz.br">
          fernando.zanchi@fiocruz.br
        </Link>
      </Text>
    </PageLayout>
  );
}
