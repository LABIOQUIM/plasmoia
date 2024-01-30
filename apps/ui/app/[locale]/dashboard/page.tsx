import { AreaChart, BarChart, PieChart } from "@mantine/charts";
import { Box, Title } from "@mantine/core";
import dayjs from "dayjs";
import { redirect } from "next/navigation";

import { PageLayout } from "@/components/PageLayout";
import { getSession } from "@/hooks/getSession";

import { getMetrics } from "./getMetrics";

import classes from "./Dashboard.module.css";

export default async function Page() {
  const session = await getSession();

  if (!session) {
    redirect("/login?reason=unauthenticated");
  }

  if (session.user.role !== "ADMINISTRATOR") {
    redirect("/new-submission?reason=unauthorized");
  }

  const metrics = await getMetrics();

  return (
    <PageLayout>
      <h1>Admin Dash</h1>
      <Box className={classes.chartContainer}>
        <Title order={3}>Submissions per day (last 15 days)</Title>
        <AreaChart
          h={256}
          tooltipAnimationDuration={200}
          data={metrics.lastMonthSubmissions.map((i) => ({
            date: dayjs(i.date).format("MMM DD"),
            submissions: i.submissions,
            infected: i.infected,
            notInfected: i.not_infected,
          }))}
          dataKey="date"
          series={[
            { name: "submissions", label: "Submissions", color: "indigo.6" },
            { name: "infected", label: "Infected", color: "red.6" },
            { name: "notInfected", label: "Not Infected", color: "green.6" },
          ]}
          curveType="linear"
        />
      </Box>
      <Box className={classes.chartSectionContainer}>
        <Box className={classes.chartContainer}>
          <Title order={3}>Cell Infection</Title>
          <PieChart
            w={256}
            h={256}
            tooltipAnimationDuration={200}
            data={metrics.cellStatus.map((i) => ({
              name: i.isInfected ? "Infected" : "Not Infected",
              value: i._count,
              color: i.isInfected ? "red" : "green",
            }))}
            tooltipDataSource="segment"
            withTooltip
          />
        </Box>
        <Box className={`${classes.chartContainer} ${classes.fillSpace}`}>
          <Title order={3}>All-time submissions by user</Title>
          <BarChart
            h={256}
            barChartProps={{
              barSize: 48,
            }}
            tooltipAnimationDuration={200}
            data={metrics.leaderboard}
            dataKey="username"
            series={[
              { name: "submissions", label: "Submissions", color: "indigo.6" },
            ]}
            tickLine="y"
          />
        </Box>
      </Box>
    </PageLayout>
  );
}

export const dynamic = "force-dynamic";
