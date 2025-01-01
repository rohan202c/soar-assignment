import React, { useState, useEffect } from "react";
import { Card, CardBody } from "reactstrap";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./dashboard.scss";
import DashboardService from "services/dashboard.service";

const QuickTransfer = () => {
  const [selectedUser, setSelectedUser] = useState(null); // Track selected user
  const [amount, setAmount] = useState(""); // Track amount entered
  const [users, setUsers] = useState([]); // Track the list of users fetched from API
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(null); // Track error state

  useEffect(() => {
    // Fetch users eligible for quick transfer
    DashboardService.getQuickTransferUsers()
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch quick transfer users:", error);
        setError("Failed to load users");
        setLoading(false);
      });
  }, []);

  const settings = {
    infinite: true,
    slidesToShow: 3, // Show 3 users at a time
    slidesToScroll: 1, // Scroll 1 user at a time
    arrows: true,
    nextArrow: (
      <div className="slick-next">
        {" "}
        <i className="ni ni-bold-right" />
      </div>
    ),
    prevArrow: <div className="slick-prev">←</div>,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const handleUserClick = (user) => {
    setSelectedUser(user);
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleSendClick = () => {
    if (selectedUser && amount) {
      alert(`Sent ${amount} to ${selectedUser.name}`);
    } else {
      alert("Please select a user and enter an amount.");
    }
  };

  if (loading) {
    return (
      <Card className="card-stats mb-4 mb-xl-0">
        <CardBody>Loading users...</CardBody>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="card-stats mb-4 mb-xl-0">
        <CardBody>{error}</CardBody>
      </Card>
    );
  }

  return (
    <Card className="card-stats mb-4 mb-xl-0">
      <CardBody>
        <div className="">
          <Slider {...settings} className="my-2">
            {users.map((user, index) => (
              <div
                key={index}
                className={`d-flex flex-column align-items-center user-card ${
                  selectedUser && selectedUser.name === user.name
                    ? "selected"
                    : ""
                }`}
                onClick={() => handleUserClick(user)}
                style={{ cursor: "pointer" }}
              >
                <img
                  src={user.imageUrl}
                  alt={user.name}
                  className="rounded-circle mb-2"
                  style={{ width: "100px", height: "100px" }}
                />
                <div
                  className={`font-weight-bold user-name ${
                    selectedUser && selectedUser.name === user.name
                      ? "font-weight-bold"
                      : ""
                  }`}
                >
                  {user.name}
                </div>
                <div
                  className={`text-primary user-role ${
                    selectedUser && selectedUser.name === user.name
                      ? "font-weight-bold"
                      : ""
                  }`}
                >
                  {user.role}
                </div>
              </div>
            ))}
          </Slider>

          <div className="d-flex align-items-center mt-5">
            <div className="text-muted mr-2">Write Amount</div>
            <input
              type="number"
              className="form-control mr-2"
              placeholder="525.50"
              value={amount}
              onChange={handleAmountChange}
              style={{ width: "100px" }}
            />
            <button
              className="btn btn-dark d-flex align-items-center"
              onClick={handleSendClick}
            >
              Send <i className="ml-2 fas fa-paper-plane"></i>
            </button>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default QuickTransfer;
