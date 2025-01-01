import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Card, CardBody } from "reactstrap";
import DashboardService from "services/dashboard.service"; // Import your service

const BalanceHistory = () => {
  const [balanceData, setBalanceData] = useState([]); // State to store fetched balance history

  // Fetch balance history data
  useEffect(() => {
    DashboardService.getBalanceHistory()
      .then((data) => {
        console.log(data); // Log the fetched data for debugging
        setBalanceData(data); // Update the state with fetched balance history
      })
      .catch((error) => {
        console.error("Failed to fetch balance history:", error);
      });
  }, []);

  // Check if balanceData is available before rendering the chart
  const data = {
    labels: ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan"], // You can update this based on your response data
    datasets: [
      {
        label: "Balance History",
        data: balanceData, // Dynamically set the fetched balance data
        fill: true,
        backgroundColor: "rgba(0, 0, 255, 0.1)",
        borderColor: "blue",
        tension: 0.4,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 200,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <Card className="card-stats mb-4 mb-xl-0">
      <CardBody>
        {/* Only render chart if data is available */}
        {balanceData.length > 0 ? (
          <Line data={data} options={options} height={250} />
        ) : (
          <p>Loading...</p> // Loading message while data is being fetched
        )}
      </CardBody>
    </Card>
  );
};

export default BalanceHistory;
