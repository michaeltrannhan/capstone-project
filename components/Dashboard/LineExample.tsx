import React, { useEffect, useRef } from "react";
// import { Chart } from "chart.js";
import Chart from "chart.js/auto";
import { createNextState } from "@reduxjs/toolkit";
import { CircularProgress, Paper } from "@mui/material";
import { useQuery } from "react-query";
import api from "../../services";

const LineChart = () => {
  const rawAuth = localStorage.getItem("auth");
  const auth = JSON.parse(rawAuth ? rawAuth : "{}");
  const {
    isIdle,
    data: DashboardData,
    isLoading: isDashboardLoading,
  } = useQuery(
    "dashboard",
    () =>
      api
        .get(`/hospital-admins/report/${auth.operatorAccount.hospitalId}`)
        .then((res) => res.data),
    {
      enabled: !!auth.operatorAccount.hospitalId,
      refetchOnWindowFocus: false,
    }
  );
  const chartRef = useRef<HTMLCanvasElement>(null);
  // console.log(Object.keys(props.activeUsers || {}));
  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d");
      if (ctx) {
        const chart = new Chart(ctx, {
          type: "line",
          data: {
            labels: isDashboardLoading
              ? ["Loading..."]
              : Object.keys(DashboardData?.activeUsersWeekly).sort(),
            datasets: [
              {
                label: "Active users",
                data: isDashboardLoading
                  ? [0]
                  : Object.entries(DashboardData?.activeUsersWeekly).sort(),
                backgroundColor: "rgba(0, 123, 255, 0.5)",
                borderColor: "rgba(0, 123, 255, 1)",
                borderWidth: 1,
              },
            ],
          },
          options: {
            responsive: true,
            scales: {
              y: {
                beginAtZero: true,
                axis: "y",
              },
            },
            backgroundColor: "white",
            borderColor: "rgba(0, 123, 255, 1)",
          },
        });
        return () => {
          chart.destroy();
        };
      }
    }
  }, [DashboardData?.activeUsersWeekly, isDashboardLoading]);
  if (isDashboardLoading) {
    return <CircularProgress />;
  }
  return <canvas ref={chartRef}></canvas>;
};

export default LineChart;
