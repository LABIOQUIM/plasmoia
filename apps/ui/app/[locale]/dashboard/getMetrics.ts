import { prisma } from "database";

export async function getMetrics() {
  const lastMonthSubmissions: {
    date: string;
    submissions: number;
    infected: number;
    not_infected: number;
  }[] = await prisma.$queryRaw`
    WITH dates AS (
      SELECT generate_series(DATE_TRUNC('day', NOW()) - INTERVAL '14 days', DATE_TRUNC('day', NOW()), INTERVAL '1 day') AS date
    )
    SELECT
      dates.date::varchar AS date,
      COALESCE(COUNT(cells.created_at), 0)::integer AS submissions,
      COALESCE(SUM(CASE WHEN cells.is_infected THEN 1 ELSE 0 END), 0)::integer AS infected,
      COALESCE(SUM(CASE WHEN NOT cells.is_infected THEN 1 ELSE 0 END), 0)::integer AS not_infected
    FROM dates
    LEFT JOIN cells ON DATE(cells.created_at) = dates.date
    GROUP BY dates.date
    ORDER BY dates.date;
  `;

  const cellStatus = await prisma.cell.groupBy({
    by: "isInfected",
    _count: true,
  });

  const leaderboard: {
    username: string;
    submissions: number;
  }[] = await prisma.$queryRaw`
    SELECT users.username, COUNT(*)::integer AS submissions
    FROM cells
    JOIN users ON cells.user_id = users.id
    GROUP BY users.username
    ORDER BY submissions DESC
    LIMIT 10;
  `;

  return {
    cellStatus,
    lastMonthSubmissions,
    leaderboard,
  };
}
