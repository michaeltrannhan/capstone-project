import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { ReminderPlanTimeDTO } from "../utils/commons";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Grid } from "@mui/material";

interface PieChartProps {
  reminderPlanTimes: ReminderPlanTimeDTO[];
}

const PieChart = (props: PieChartProps) => {
  const countTaken = props.reminderPlanTimes.filter(
    (rpt) => rpt.isTaken
  ).length;
  const countTakenUntilNow = props.reminderPlanTimes
    .filter((rpt) => {
      const rptDate = new Date(rpt.time);
      const now = new Date();
      return rptDate < now;
    })
    .filter((rpt) => rpt.isTaken).length;
  const countTotalUntilNow = props.reminderPlanTimes.filter((rpt) => {
    const rptDate = new Date(rpt.time);
    const now = new Date();
    return rptDate < now;
  }).length;
  const skippedUntilNow = countTotalUntilNow - countTakenUntilNow;
  const countTotal = props.reminderPlanTimes.length;
  const remaining = countTotal - countTotalUntilNow;
  const countDosage = props.reminderPlanTimes
    .map((rpt) => rpt.dosage)
    .reduce((a, b) => a + b, 0);
  const countTakenDosage = props.reminderPlanTimes[0].dosage * countTaken;
  const pieRef = useRef<HTMLCanvasElement>(null);
  const pieRef2 = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (pieRef.current) {
      const ctx = pieRef.current.getContext("2d");
      if (ctx) {
        const chart = new Chart(ctx, {
          type: "pie",
          data: {
            labels: ["Taken", "Not Taken", "Remaining"],
            datasets: [
              {
                label: "Number of times taken/skipped",
                data: [countTakenUntilNow, skippedUntilNow, remaining],
              },
            ],
          },
          plugins: [ChartDataLabels],
          options: {
            responsive: true,
            plugins: {
              legend: {
                position: "top",
              },
              title: {
                display: true,
                text: "Patient Report on the Medication Plan",
              },

              datalabels: {
                formatter: (value, ctx) => {
                  let sum = 0;
                  let dataArr = ctx.chart.data.datasets[0].data;
                  dataArr.map((data) => {
                    sum += data as number;
                  });
                  let percentage = ((value * 100) / sum).toFixed(2) + "%";
                  return percentage;
                },
                color: "#fff",
              },
            },
          },
        });
        return () => {
          chart.destroy();
        };
      }
    }
  });
  useEffect(() => {
    if (pieRef2.current) {
      const ctx = pieRef2.current.getContext("2d");
      if (ctx) {
        const chart = new Chart(ctx, {
          type: "pie",
          data: {
            labels: ["Taken Dosage", "Remaining"],
            datasets: [
              {
                label: "Taken Dosage/Remaining",
                data: [countTakenDosage, countDosage - countTakenDosage],
              },
            ],
          },
          plugins: [ChartDataLabels],
          options: {
            responsive: true,
            plugins: {
              legend: {
                position: "top",
              },
              title: {
                display: true,
                text: "Patient Report on the Dosage process of the Medication",
              },

              datalabels: {
                formatter: (value, ctx) => {
                  let sum = 0;
                  let dataArr = ctx.chart.data.datasets[0].data;
                  dataArr.map((data) => {
                    sum += data as number;
                  });
                  let percentage = ((value * 100) / sum).toFixed(2) + "%";
                  return percentage;
                },
                color: "#fff",
              },
            },
          },
        });
        return () => {
          chart.destroy();
        };
      }
    }
  });
  return (
    <Grid container spacing={2}>
      <Grid item xs>
        <canvas ref={pieRef}></canvas>
      </Grid>
      <Grid item xs>
        <canvas ref={pieRef2}></canvas>
      </Grid>
    </Grid>
  );
};
export default PieChart;
