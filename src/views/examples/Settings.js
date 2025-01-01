import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
} from "reactstrap";
import Header from "components/Headers/Header.js";
import classnames from "classnames";
import UserService from "services/user.service";
import ToastService from "services/toast.service";
import { ToastType } from "constants/toastTypes";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("1");
  const { showToast, ToastContainerComponent } = ToastService(); // Get toast methods
  const [formData, setFormData] = useState({
    fullName: "",
    userName: "",
    email: "",
    dateOfBirth: "",
    presentAddress: "",
    permanentAddress: "",
    city: "",
    postalCode: "",
    country: "",
    profileImage: "https://i.pravatar.cc/306", // Default profile image
  });

  const [loading, setLoading] = useState(true); // Loading state to handle API call

  // Toggle between tabs
  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  // Handle input change in the form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prevData) => ({
          ...prevData,
          profileImage: reader.result, // Set uploaded image as profile image
        }));
        showToast({
          type: ToastType.SUCCESS,
          message: "Profile image updated successfully!",
        });
      };
      reader.readAsDataURL(file);
    } else {
      showToast({
        type: ToastType.ERROR,
        message: "Please select a valid image file.",
      });
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await UserService.updateUser(formData);
      console.log("User updated successfully:", response);
      showToast({
        type: ToastType.SUCCESS,
        message: "Profile updated successfully!",
      });
    } catch (error) {
      console.error("Error submitting user data:", error);
      showToast({
        type: ToastType.ERROR,
        message: "Failed to update profile!",
      });
    }
  };

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = await UserService.getUser();
        setFormData({
          fullName: user.fullName,
          userName: user.userName,
          email: user.email,
          dateOfBirth: user.dateOfBirth.split("T")[0], // Convert to date format
          presentAddress: user.presentAddress,
          permanentAddress: user.permanentAddress,
          city: user.city,
          postalCode: user.postalCode,
          country: user.country,
          profileImage: user.profileImage || "https://i.pravatar.cc/306", // Default profile image
        });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Header />
      <Container className="mt--7" fluid>
        <Row>
          <div className="col">
            <Card>
              <CardHeader className="bg-white border-0">
                <Nav tabs>
                  <NavItem>
                    <NavLink
                      className={classnames({ active: activeTab === "1" })}
                      onClick={() => {
                        toggle("1");
                      }}
                    >
                      Edit Profile
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classnames({ active: activeTab === "2" })}
                      onClick={() => {
                        toggle("2");
                      }}
                    >
                      Preferences
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classnames({ active: activeTab === "3" })}
                      onClick={() => {
                        toggle("3");
                      }}
                    >
                      Security
                    </NavLink>
                  </NavItem>
                </Nav>
              </CardHeader>
              <CardBody>
                <TabContent activeTab={activeTab}>
                  <TabPane tabId="1">
                    <Form onSubmit={handleSubmit}>
                      <Row>
                        <Col md="3">
                          <div className="text-center position-relative">
                            <img
                              src={formData.profileImage}
                              alt="Profile"
                              height={150}
                              width={150}
                              className="rounded-circle img-fluid"
                            />
                            {/* Edit Icon */}
                            <div
                              onClick={() =>
                                document.getElementById("imageInput").click()
                              }
                              style={{
                                color: "white",
                                position: "absolute",
                                bottom: "7px",
                                right: "60px",
                                backgroundColor: "black",
                                borderRadius: "50%",
                                padding: "8px",
                                cursor: "pointer",
                                boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
                              }}
                            >
                              <i
                                className="fa fa-pencil"
                                style={{ fontSize: "12px" }}
                              ></i>
                            </div>
                            <Input
                              type="file"
                              id="imageInput"
                              accept="image/*"
                              style={{ display: "none" }}
                              onChange={handleImageUpload}
                            />
                          </div>
                        </Col>
                        <Col md="9">
                          <Row>
                            <Col md="6">
                              <FormGroup>
                                <label className="text-dark">Full Name</label>
                                <Input
                                  type="text"
                                  name="fullName"
                                  value={formData.fullName}
                                  onChange={handleInputChange}
                                />
                              </FormGroup>
                            </Col>
                            <Col md="6">
                              <FormGroup>
                                <label className="text-dark">User Name</label>
                                <Input
                                  type="text"
                                  name="userName"
                                  value={formData.userName}
                                  onChange={handleInputChange}
                                />
                              </FormGroup>
                            </Col>
                          </Row>
                          <Row>
                            <Col md="6">
                              <FormGroup>
                                <label className="text-dark">Email</label>
                                <Input
                                  type="email"
                                  name="email"
                                  value={formData.email}
                                  onChange={handleInputChange}
                                />
                              </FormGroup>
                            </Col>
                            <Col md="6">
                              <FormGroup>
                                <label className="text-dark">Password</label>
                                <Input
                                  type="password"
                                  name="password"
                                  value={formData.password}
                                  onChange={handleInputChange}
                                />
                              </FormGroup>
                            </Col>
                          </Row>
                          <Row>
                            <Col md="6">
                              <FormGroup>
                                <label className="text-dark">
                                  Date of Birth
                                </label>
                                <Input
                                  type="date"
                                  name="dateOfBirth"
                                  value={formData.dateOfBirth}
                                  onChange={handleInputChange}
                                />
                              </FormGroup>
                            </Col>
                            <Col md="6">
                              <FormGroup>
                                <label className="text-dark">
                                  Present Address
                                </label>
                                <Input
                                  type="text"
                                  name="presentAddress"
                                  value={formData.presentAddress}
                                  onChange={handleInputChange}
                                />
                              </FormGroup>
                            </Col>
                          </Row>
                          <Row>
                            <Col md="6">
                              <FormGroup>
                                <label className="text-dark">
                                  Permanent Address
                                </label>
                                <Input
                                  type="text"
                                  name="permanentAddress"
                                  value={formData.permanentAddress}
                                  onChange={handleInputChange}
                                />
                              </FormGroup>
                            </Col>
                            <Col md="6">
                              <FormGroup>
                                <label className="text-dark">City</label>
                                <Input
                                  type="text"
                                  name="city"
                                  value={formData.city}
                                  onChange={handleInputChange}
                                />
                              </FormGroup>
                            </Col>
                          </Row>
                          <Row>
                            <Col md="6">
                              <FormGroup>
                                <label className="text-dark">Postal Code</label>
                                <Input
                                  type="text"
                                  name="postalCode"
                                  value={formData.postalCode}
                                  onChange={handleInputChange}
                                />
                              </FormGroup>
                            </Col>
                            <Col md="6">
                              <FormGroup>
                                <label className="text-dark">Country</label>
                                <Input
                                  type="text"
                                  name="country"
                                  value={formData.country}
                                  onChange={handleInputChange}
                                />
                              </FormGroup>
                            </Col>
                          </Row>
                          <Row className="justify-content-end">
                            <Col md="auto">
                              <Button
                                color="primary"
                                type="submit"
                                className="bg-dark"
                              >
                                Save
                              </Button>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </Form>
                  </TabPane>
                  <TabPane tabId="2">
                    <p>Preferences content goes here.</p>
                  </TabPane>
                  <TabPane tabId="3">
                    <p>Security content goes here.</p>
                  </TabPane>
                </TabContent>
              </CardBody>
            </Card>
          </div>
        </Row>
      </Container>

      {/* Render Toast container */}
      <ToastContainerComponent />
    </>
  );
};

export default Settings;
