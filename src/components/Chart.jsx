/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

const Chart = ({ categoryData, categoryMapping }) => {
  const pieChartData = {
    labels: Object.keys(categoryMapping),
    datasets: [
      {
        data: Object.keys(categoryMapping).map(
          (key) => categoryData[key]?.length || 0
        ),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#FF9F40",
          "#9966FF",
          "#FFCD56",
          "#66BB6A",
          "#FF6F61",
          "#42A5F5",
        ],
        hoverBackgroundColor: [
          "#FF4863",
          "#36A0D6",
          "#FFAC39",
          "#4BB0A2",
          "#FF8F3A",
          "#9961FF",
          "#FFD033",
          "#66A658",
          "#FF6F58",
          "#4296F1",
        ],
      },
    ],
  };

  const pieChartOptions = {
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            const categoryKey = context.label || "Unknown";
            const categoryFullName =
              categoryMapping[categoryKey] || categoryKey;
            const dataset = context.dataset;
            const total = dataset.data.reduce((sum, value) => sum + value, 0);
            const value = dataset.data[context.dataIndex];
            const percentage = ((value / total) * 100).toFixed(2);
            return `${categoryFullName}: ${percentage}%`;
          },
        },
      },
    },
    maintainAspectRatio: true,
    responsive: true,
  };

  return (
    <div
      style={{
        textAlign: "center",
        margin: "20px",
        maxWidth: "600px",
        margin: "auto",
      }}
    >
      <Pie data={pieChartData} options={pieChartOptions} />
    </div>
  );
};

export default Chart;
