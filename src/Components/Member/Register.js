import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import memberService from "../../Dbservices/MemberServices";
import image from "../Images/generaluser.png";

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Col,
  CardHeader,
  Container,
  Form,
  Input,
  InputGroup,
  Row,
  Table,
} from "reactstrap";

function Register(props) {
  const [Mem, setAuth] = useState({ MID: "", MName: "" , Dob: " ", contactno:"",email:"",Address:"",Password:""});
  const history = useHistory();

  const ISValidate = (e) => {
    let IsValid = true;
    if (!Mem.MID) {
      alert("Enter User ID");
      IsValid = false;
    }
    else if (!Mem.MName) {
      alert("Enter User Name");
      IsValid = false;
    }
    else if (!Mem.Dob) {
      alert("Enter User Date Of Birth");
      IsValid = false;
    }
    else if (!Mem.contactno) {
      alert("Enter User Contact No");
      IsValid = false;
    }
    else if (!Mem.email) {
      alert("Enter User Email");
      IsValid = false;
    }
    else if (!Mem.Address) {
      alert("Enter User Address");
      IsValid = false;
    }
    else if (!Mem.Password) {
      alert("Enter User Password");
      IsValid = false;
    }
    else{
      return IsValid;
    }
    
    
  }

  // Add Author
  const RegisterMem = (e) => {
    e.preventDefault();
    if (ISValidate()) {
      
    const data = { 
      memberID: Mem.MID,
      memberFullName: Mem.MName,
      memberDOB: Mem.Dob,
      memberContactNo: Mem.contactno,
      memberEmail: Mem.email,  
      memberFullAddress: Mem.Address,
      memberPassword: Mem.Password
    };
    memberService.createMember(data).then((result) => {
      if(result.data == "faild") 
      {
        alert("Sorrrrrry !!!! Un-authenticated User !!!!!");
      }
      else {
        alert("Successfully Register.....!!!!!");
        history.push("/StudentLogin");
      }
    });
    
    }
    

    
  };

  const onChange = (e) => {
    e.persist();
    setAuth({ ...Mem, [e.target.name]: e.target.value });
  };

  return (
    <div style={{display : 'flex', justifyContent:'center',alignItems:'center',height:'95vh'}}>
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
                          <img width="50px" src={image} />
                        </center>
                      </div>

                      <h3 style={{ textAlign: "center" }}>Sign UP</h3>
                    </center>
                  </CardHeader>
                    <CardBody className="p-4">
                      <Form>
                      <label className="mb-1">Enter Student ID :</label>
                        <InputGroup className="mb-1">
                          <Input
                            type="text"
                            name="MID"
                            id="MID"
                            placeholder="Student ID"
                            value={Mem.MID}
                            onChange={onChange}
                          />
                        </InputGroup>
                        <label className="mb-1">Enter Student Name :</label>
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
                        <label className="mb-1">Enter Student Date OF Birth :</label>
                        <InputGroup className="mb-1">
                          <Input
                            type="date"
                            placeholder="Date OF Birth"
                            name="Dob"
                            id="Dob"
                            value={Mem.Dob}
                            onChange={onChange}
                          />
                        </InputGroup>
                        <label className="mb-1">Enter Student Contact No :</label>
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
                        <label className="mb-1">Enter Student Email :</label>
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
                        <label className="mb-1">Enter Student Address :</label>
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
                        <label className="mb-1">Enter Student Password :</label>
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
                              <Button
                                type="submit"
                                onClick={RegisterMem}
                               
                                block
                              >
                               <center> <span>Register here !!!</span></center>
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

export default Register;
