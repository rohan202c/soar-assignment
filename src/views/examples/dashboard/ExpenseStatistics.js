import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Card, CardBody } from "reactstrap";
import DashboardService from "services/dashboard.service";

const ExpenseStatistics = () => {
  const [expenseData, setExpenseData] = useState([0, 0, 0, 0]);

  useEffect(() => {
    DashboardService.getExpenseStatistics()
      .then((data) => {
        setExpenseData(data);
      })
      .catch((error) => {
        console.error("Failed to fetch expense statistics:", error);
      });
  }, []);

  const data = {
    labels: ["Entertainment", "Bill Expense", "Investment", "Others"],
    datasets: [
      {
        data: expenseData,
        backgroundColor: ["#343C6A", "#FC7900", "#232323", "#396AFF"],
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const label = context.label || "";
            const value = context.raw || 0;
            return `${label}: $${value}`;
          },
        },
      },
    },
  };

  return (
    <Card className="card-stats mb-4 mb-xl-0">
      <CardBody>
        <div style={{ width: "100%", height: "350px" }}>
          <Pie data={data} options={options} />
        </div>
      </CardBody>
    </Card>
  );
};

export default ExpenseStatistics;
