import React, { useEffect, useState } from "react";
import { Card, CardBody } from "reactstrap";
import { Bar } from "react-chartjs-2";
import DashboardService from "services/dashboard.service";

const WeeklyActivity = () => {
  const [chartData, setChartData] = useState({
    labels: ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"],
    datasets: [
      {
        label: "Deposit",
        data: [],
        backgroundColor: "#396AFF",
        maxBarThickness: 10,
      },
      {
        label: "Withdraw",
        data: [],
        backgroundColor: "#232323",
        maxBarThickness: 10,
      },
    ],
  });

  const chartOptions = {
    scales: {
      yAxes: [
        {
          ticks: {
            stepSize: 100,
            min: 0,
            max: 500,
            callback: function (value) {
              return value;
            },
          },
          gridLines: {
            color: "rgba(200, 200, 200, 0.5)",
            drawBorder: false,
            zeroLineColor: "rgba(200, 200, 200, 0.5)",
            drawTicks: false,
          },
        },
      ],
      xAxes: [
        {
          barPercentage: 0.5,
          categoryPercentage: 0.4,
          gridLines: {
            drawOnChartArea: false,
            drawTicks: false,
          },
        },
      ],
    },
    tooltips: {
      callbacks: {
        label: function (item, data) {
          let label = data.datasets[item.datasetIndex].label || "";
          let yLabel = item.yLabel;
          return `${label}: ${yLabel}`;
        },
      },
    },
    legend: {
      display: true,
      position: "top",
      align: "end",
      labels: {
        usePointStyle: true,
        boxWidth: 8,
      },
    },
  };

  useEffect(() => {
    DashboardService.getWeeklyActivity()
      .then((data) => {
        setChartData((prevData) => ({
          ...prevData,
          datasets: [
            {
              ...prevData.datasets[0],
              data: data.deposit, // Update deposit data
            },
            {
              ...prevData.datasets[1],
              data: data.withdraw, // Update withdraw data
            },
          ],
        }));
      })
      .catch((error) => {
        console.error("Failed to fetch weekly activity data:", error);
      });
  }, []);

  return (
    <Card className="card-stats mb-4 mb-xl-0">
      <CardBody>
        <div className="chart">
          <Bar data={chartData} options={chartOptions} />
        </div>
      </CardBody>
    </Card>
  );
};

export default WeeklyActivity;
