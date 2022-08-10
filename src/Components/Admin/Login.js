import React, { Component, useEffect } from "react";
import image from "../Images/adminuser.png";


import {
  Button,
  Card,
  CardBody,
  CardGroup,
  Col,
  Container,
  Form,
  Input,
  InputGroup,
  CardHeader,
  InputGroupAddon,
  InputGroupText,
  Row,
} from "reactstrap";

class Login extends Component {
  constructor() {
    super();

    this.state = {
      username: "",
      password: "",
      };

    this.password = this.password.bind(this);
    this.username = this.username.bind(this);
    this.login = this.login.bind(this);
  }

  username(event) {
    this.setState({ username: event.target.value });
    
  }
  password(event) {
    this.setState({ password: event.target.value });
  }


  login(event) {
    event.persist();
    
    if (!this.state.username) {
      alert("Enter User Name");
    }
    else if (!this.state.password) {
      alert("Enter Password");
    }
    else{
      fetch("https://localhost:44344/api/Logins/AdminLogin", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        adminID: this.state.username,
        adminPassword: this.state.password,
      }),
    })
      .then((Response) => Response.json())
      .then((result) => {
        console.log(result);
        if (result.status == "Invalid") alert("Invalid User");
        else {
          localStorage.setItem("user-info", result.status);
          this.props.history.push("/Home");
          window.location.reload(false);
        }
      });
    }

    
    
  }


  
  render() {
    return (
      <div className="justify-content-center" style={{display : 'flex', justifyContent:'center',alignItems:'center',height:'90vh'}}>
        <Container>
          <Row className="justify-content-center">
            <Col md="9" lg="7" xl="5">
              <CardGroup>
                <Card className="p-2">
                <CardHeader>
                    <center>
                      <div className="row" className="mb-2 pageheading">
                        <center>
                          {" "}
                          <img width="150px" src={image} />
                        </center>
                      </div>

                      <h3 style={{ textAlign: "center" }}>Admin Login</h3>
                    </center>
                  </CardHeader>
                  <CardBody>
                    <Form>
                    <label className="mb-3">Enter Admin UserName :</label>
                      <InputGroup className="mb-3">
                        <Input
                          type="text"
                          onChange={this.username}
                          placeholder="Enter username"
                        />
                      </InputGroup>
                      <label className="mb-3">Enter Admin Password :</label>
                      <InputGroup className="mb-4">
                        <Input
                          type="password"
                          onChange={this.password}
                          placeholder="Enter password"
                        />
                      </InputGroup>
                      <Button onClick={this.login} color="success" block>
                        Login
                      </Button>
                    </Form>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Login;
