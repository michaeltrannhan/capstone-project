import React, { useEffect, useRef } from "react";
// import { Chart } from "chart.js";
import Chart from "chart.js/auto";
import { createNextState } from "@reduxjs/toolkit";

const LineChart: React.FC = () => {
  const chartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d");
      if (ctx) {
        const chart = new Chart(ctx, {
          type: "line",
          data: {
            labels: [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
              "Sunday",
            ],
            datasets: [
              {
                label: "This week active users",
                data: [4, 2, 8, 5, 12, 1, 1],
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
          },
        });
        return () => {
          chart.destroy();
        };
      }
    }
  }, []);

  return <canvas ref={chartRef}></canvas>;
};

export default LineChart;
