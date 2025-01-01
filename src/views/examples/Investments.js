import { Card, CardBody, Container, Row } from "reactstrap";

import Header from "components/Headers/Header.js";

const Investments = () => {
  return (
    <>
      <Header />
      <Container className="mt--7" fluid>
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardBody>
                <div className="h4"> Investments content goes here...</div>
              </CardBody>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default Investments;