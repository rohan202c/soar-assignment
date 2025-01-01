import React from "react";
import { Card, CardBody, CardFooter, Row } from "reactstrap";

const DashboardCard = ({ card }) => {
  const maskCardNumber = (cardNumber) => {
    const firstFour = cardNumber.slice(0, 4);
    const middle = "*".repeat(cardNumber.length - 8); // Mask the middle digits
    const lastFour = cardNumber.slice(-4);

    // Create the masked card number with spaces after the first 4 and before the last 4
    return `${firstFour} ${middle} ${lastFour}`;
  };
  return (
    <Card className="card-stats mb-4 mb-xl-0 text-white">
      <CardBody className={card.isCreditCard ? "credit-card" : "debit-card"}>
        <Row>
          <div className="col">
            <div className="text-xs label">Balance</div>
            <div className="text-sm">$5,456</div>
          </div>
          <img
            src={card.imgSrc}
            alt={card.title}
            style={{
              width: "50px",
              maxHeight: "100%",
            }}
          />
        </Row>
        <Row className="mt-4">
          <div className="col">
            <div className="d-flex">
              <div>
                <div className="text-xs label">CARD HOLDER</div>
                <div className="text-sm">
                  {card.firstName} {card.lastName}
                </div>
              </div>
              <div className="ml-4">
                <div className="text-xs label">VALID THRU</div>
                <div className="text-sm">
                  {new Date(card.validTill).toLocaleDateString("en-US", {
                    month: "2-digit",
                    year: "2-digit",
                  })}
                </div>
              </div>
            </div>
          </div>
        </Row>
      </CardBody>
      <CardFooter className={card.isCreditCard ? "credit-card" : "debit-card"}>
        <div className="d-flex justify-content-between">
          <div>{maskCardNumber(card.cardNumber)}</div>
          <img
            src={card.brandLogo}
            alt={card.title}
            style={{
              width: "50px",
              maxHeight: "100%",
            }}
          />
        </div>
      </CardFooter>
    </Card>
  );
};

export default DashboardCard;
