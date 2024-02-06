import { ReactElement } from "react";
import { Box, Title } from "@mantine/core";
import { IconMicroscope } from "@tabler/icons-react";
import Link from "next/link";

import classes from "./Logo.module.css";

export function Logo(): ReactElement {
  return (
    <Box component={Link} href="/" className={classes.container}>
      <IconMicroscope />
      <Title className={classes.title}>PlasmoIA</Title>
    </Box>
  );
}
