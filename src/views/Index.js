import "./Index.scss";
import { useState, useEffect } from "react";
import Chart from "chart.js";
import { Container, Row, Col } from "reactstrap";

// core components
import { chartOptions, parseOptions } from "variables/charts.js";

import DashboardCard from "./examples/dashboard/DashboardCards";

import chipCardWhite from "../assets/img/icons/chip_card_white.png";
import chipCardBlack from "../assets/img/icons/chip_card_black.png";
import creditCardBrand from "../assets/img/icons/cc_company.png";
import debitCardBrand from "../assets/img/icons/dc_company.png";
import RecentTransactions from "./examples/dashboard/RecentTransactions";
import WeeklyActivity from "./examples/dashboard/WeeklyActivity";
import ExpenseStatistics from "./examples/dashboard/ExpenseStatistics";
import QuickTransfer from "./examples/dashboard/QuickTransfer";
import BalanceHistory from "./examples/dashboard/BalanceHistory";
import ApiService from "services/api.service";
import DashboardService from "services/dashboard.service";

const Index = (props) => {
  const [showAll, setShowAll] = useState(false);
  const [cardData, setCardData] = useState([]);

  if (window.Chart) {
    parseOptions(Chart, chartOptions());
  }

  useEffect(() => {
    DashboardService.getCardData()
      .then((data) => {
        setCardData(data);
      })
      .catch((error) => {
        console.error("Failed to fetch card data:", error);
      });
  }, []);

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  return (
    <div className="header pb-8 pt-5 pt-md-8">
      <Container fluid>
        <div className="header-body">
          {/* Card stats */}
          <Row>
            <Col lg="8" xl="8">
              <div className="d-flex justify-content-between">
                <div className="h2">My Cards</div>
                <div>
                  <a
                    onClick={toggleShowAll}
                    className="font-weight-600 text-sm"
                    style={{ cursor: "pointer" }}
                  >
                    {showAll ? "See Less" : "See All"}
                  </a>
                </div>
              </div>
              <Row>
                {cardData
                  .slice(0, showAll ? cardData.length : 2)
                  .map((card, index) => (
                    <Col lg="6" xl="6" key={index}>
                      <DashboardCard card={card} />
                    </Col>
                  ))}
              </Row>
            </Col>
            <Col lg="4" xl="4">
              <div className="h2">Recent Transactions</div>
              <RecentTransactions></RecentTransactions>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col lg="8" xl="8">
              <div className="h2">Weekly Activity</div>
              <WeeklyActivity></WeeklyActivity>
            </Col>
            <Col lg="4" xl="4">
              <div className="h2">Expense Statistics</div>
              <ExpenseStatistics></ExpenseStatistics>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col lg="5" xl="5">
              <div className="h2">Quick Transfer</div>
              <QuickTransfer></QuickTransfer>
            </Col>
            <Col lg="7" xl="7">
              <div className="h2">Balance History</div>
              <BalanceHistory></BalanceHistory>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
};

export default Index;
