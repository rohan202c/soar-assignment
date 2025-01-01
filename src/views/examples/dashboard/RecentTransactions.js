import "./dashboard.scss";
import React, { useEffect, useState } from "react";
import { Card, CardBody } from "reactstrap";
import DashboardService from "services/dashboard.service"; // Import your service

import depositCard from "./../../../assets/img/icons/deposit_card.png";
import depositPaypal from "./../../../assets/img/icons/deposit_paypal.png";
import depositAdhoc from "./../../../assets/img/icons/deposit_adhoc.png";
import { TRANSACTION_SOURCE_TYPE } from "constants/transaction.constant";

const RecentTransactions = () => {
  // State to store transactions data
  const [transactionsData, setTransactionsData] = useState([]);

  // Fetch the recent transactions when the component mounts
  useEffect(() => {
    DashboardService.getRecentTransactions()
      .then((data) => {
        setTransactionsData(data); // Set the fetched transactions data
      })
      .catch((error) => {
        console.error("Failed to fetch recent transactions:", error);
      });
  }, []);

  return (
    <Card className="card-stats mb-4 mb-xl-0">
      <CardBody>
        <div className="recent-transactions">
          {transactionsData.map((transaction, index) => (
            <div className="d-flex align-items-center mb-3" key={index}>
              <div
                className={`mr-3 rounded-circle p-1 ${
                  transaction.paymentMode === TRANSACTION_SOURCE_TYPE.CARD
                    ? "my-card"
                    : ""
                } ${
                  transaction.paymentMode === TRANSACTION_SOURCE_TYPE.PAYPAL
                    ? "paypal"
                    : ""
                } ${
                  transaction.paymentMode === TRANSACTION_SOURCE_TYPE.ADHOC
                    ? "adhoc"
                    : ""
                }`}
              >
                <img
                  src={
                    transaction.icon === "depositCard"
                      ? depositCard
                      : transaction.icon === "depositPaypal"
                      ? depositPaypal
                      : depositAdhoc
                  }
                  alt={transaction.source}
                  style={{
                    width: "40px",
                    maxHeight: "100%",
                  }}
                  className="p-2"
                />
              </div>

              {/* Transaction Details */}
              <div className="flex-grow-1">
                <div className="font-weight-bold">{transaction.source}</div>
                <div className="text-muted">
                  {new Date(transaction.date).toLocaleDateString("en-US", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </div>
              </div>

              {/* Transaction Amount */}
              <div
                className={`font-weight-bold ${
                  transaction.isCredited ? "text-success" : "text-danger"
                }`}
              >
                {transaction.isCredited ? "+" : "-"}${transaction.amount}
              </div>
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  );
};

export default RecentTransactions;
