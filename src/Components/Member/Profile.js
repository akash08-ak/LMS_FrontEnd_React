import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import memberService from "../../Dbservices/MemberServices";
import image from "../Images/generaluser.png";



import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Col,
  Container,
  Form,
  Input,
  InputGroup,
  Row,
} from "reactstrap";

function Profile(props) {

  const history = useHistory();
  function logout() {
    
    localStorage.clear();
    history.push("/StudentLogin");
    window.location.reload(false);
  }
  const user = localStorage.getItem("username");

  const [Mem, SetMem] = useState({
    MID: "",
    MName: "",
    Dob: "",
    contactno: "",
    email: "",
    Address: "",
    Password: "",
  });
  

  useEffect(() => {
    GetData();
  }, []);

  const GetData = () => {
    memberService.getMemberById(user).then((result) => {
      let temparray = [];
      temparray.push(result.data);
      SetMem({
        MID: result.data.memberID,
        MName: result.data.memberFullName,
        Dob: result.data.memberDOB,
        contactno: result.data.memberContactNo,
        email: result.data.memberEmail,
        Address: result.data.memberFullAddress,
        Password: result.data.memberPassword,
      });
    });
  };

  //Update Member
  const RegisterMem = (e) => {
    e.preventDefault();
    const data = {
      memberID: Mem.MID,
      memberFullName: Mem.MName,
      memberDOB: Mem.Dob,
      memberContactNo: Mem.contactno,
      memberEmail: Mem.email,
      memberFullAddress: Mem.Address,
      memberPassword: Mem.Password,
    };
    memberService.updateMember(data).then((result) => {
      if (result.data == "faild") {
        alert("Sorrrrrry !!!! Un-authenticated User !!!!!");
      } else {
        alert("Profile Successfully Updated. Kindly Login again......");
        logout();
      }
    });
  };

  const onChange = (e) => {
    e.persist();
    SetMem({ ...Mem, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="justify-content-center">
            <Container>
              <Row className="justify-content-center">
                <Col md="12" lg="10" xl="5">
                  <Card className="mx-4">
                    <CardHeader>
                      <center>
                        <div className="row" className="mb-2 pageheading">
                          <center>
                            {" "}
                            <img width="100px" src={image} />
                          </center>
                        </div>

                        <h3 style={{ textAlign: "center" }}>
                          Personal Information
                        </h3>
                      </center>
                    </CardHeader>
                    <CardBody className="p-4">
                      <Form>
                        <label className="mb-1">Student ID :</label>
                        <InputGroup className="mb-1">
                          <Input
                            type="text"
                            disabled
                            name="MID"
                            id="MID"
                            placeholder="Student ID"
                            value={Mem.MID}
                            onChange={onChange}
                          />
                        </InputGroup>
                        <label className="mb-1">Student Name :</label>
                        <InputGroup className="mb-1">
                          <Input
                            type="text"
                            placeholder="Student Name"
                            name="MName"
                            id="MName"
                            value={Mem.MName}
                            onChange={onChange}
                          />
                        </InputGroup>
                        <label className="mb-1">Student Date OF Birth :</label>
                        <InputGroup className="mb-1">
                          <Input
                            type="text"
                            disabled
                            placeholder="Date OF Birth"
                            name="Dob"
                            id="Dob"
                            value={Mem.Dob}
                            onChange={onChange}
                          />
                        </InputGroup>
                        <label className="mb-1">Student Contact No :</label>
                        <InputGroup className="mb-1">
                          <Input
                            type="text"
                            placeholder="Contact No"
                            name="contactno"
                            id="contactno"
                            required={true}
                            value={Mem.contactno}
                            onChange={onChange}
                          />
                        </InputGroup>
                        <label className="mb-1">Student Email :</label>
                        <InputGroup className="mb-1">
                          <Input
                            type="text"
                            placeholder="Email"
                            name="email"
                            id="email"
                            value={Mem.email}
                            onChange={onChange}
                          />
                        </InputGroup>
                        <label className="mb-1">Student Address :</label>
                        <InputGroup className="mb-1">
                          <Input
                            type="text"
                            placeholder="Address"
                            name="Address"
                            id="Address"
                            value={Mem.Address}
                            onChange={onChange}
                          />
                        </InputGroup>
                        <label className="mb-1">Student Password :</label>
                        <InputGroup className="mb-1">
                          <Input
                            type="password"
                            placeholder="Password"
                            name="Password"
                            id="Password"
                            value={Mem.Password}
                            onChange={onChange}
                          />
                        </InputGroup>

                        <CardFooter className="p-4">
                          <Row>
                            <Col xs="12" sm="12">
                              <Button type="submit" onClick={RegisterMem} block>
                                <center>
                                  {" "}
                                  <span>Update Profile !!!</span>
                                </center>
                              </Button>
                            </Col>
                          </Row>
                        </CardFooter>
                      </Form>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </Container>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
