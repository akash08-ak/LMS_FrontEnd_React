import React, { useState, useEffect } from "react";
import publisherService from "../../Dbservices/PublisherServices";
import image from "../Images/publisher.png";

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

function Publisher(props) {
  const [data, setData] = useState([]);
  const [pub, setpub] = useState({ ID: "", Name: "" });
  const [error, seterror] = useState({ ID: "", Name: "" });


  useEffect(() => {
    GetData();
  });

  //Get Publisher
  const GetData = () => {
    publisherService.getAllpublisher().then((result) => {
      setData(result.data);
    });
  };

  // Add Publisher
  const AddNewPublisher = (e) => {
    e.preventDefault();
    const data = { publisherID: pub.ID, publisherName: pub.Name };
    if (!pub.ID) {
      error["ID"] =   "Publisher ID is required..! ";
      
    }
    else if (!pub.Name) {
      error["Name"] =   "Publisher Name is required..! ";
    }
    else{
    publisherService.createpublisher(data).then((result) => {
      GetData();
      if (result.data == "faild") alert("Publisher already present");
      else alert("Publisher Added successfully");
    });
  }
  };

  // Update Publisher
  const UpdateNewPublisher = (e) => {
    e.preventDefault();
    const data = { publisherID: pub.ID, publisherName: pub.Name };
    if (!pub.ID) {
      error["ID"] =   "Publisher ID is required..! ";
      
    }
    else if (!pub.Name) {
      error["Name"] =   "Publisher Name is required..! ";
    }
    else{
    publisherService.updatepublisher(data).then((result) => {
      GetData();
      if (result.data == "faild") alert("Publisher Not Preset");
      else alert("Publisher Updated successfully ");
    });
  }
  };

  // Delete Publisher
  const DeleteNewPublisher = () => {
    if (!pub.ID) {
      error["ID"] =   "Publisher ID is required..! ";      
    }
    else{
    publisherService.deletepublisher(pub.ID).then((result) => {
      GetData();
      if (result.data == "faild") alert("Publisher Not Preset");
      else if(result.data == "unable to delete") alert("Publisher may be assign");
      else alert("Publisher Deleted successfully");
    });
  }
  };

  const onChange = (e) => {
    e.persist();
    setpub({ ...pub, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-md-7">
            <Container>
              <Row className="justify-content-center">
                <Col md="12" lg="10" xl="8">
                  <Card className="mx-4">
                  <CardHeader style={{ textAlign: "center" }}>
                  <center>
                          {" "}
                          <img width="70px" src={image} />
                          <h3 style={{ textAlign: "center" }}>Publisher</h3>
                        </center>
                    </CardHeader>
                    <CardBody className="p-4">
                      <Form>
                      <label className="mb-3">Enter Publisher ID :</label>
                        <InputGroup className="mb-3">
                          <Input
                            type="text"
                            name="ID"
                            id="ID"
                            placeholder="ID"
                            value={pub.ID}
                            onChange={onChange}
                          />
                        </InputGroup>
                        <span style={{ color: 'red' }} >{error.ID}</span><br/>
                        <label className="mb-3">Enter Publisher Name :</label>
                        <InputGroup className="mb-3">
                          <Input
                            type="text"
                            placeholder="Name"
                            name="Name"
                            id="Name"
                            value={pub.Name}
                            onChange={onChange}
                          />
                        </InputGroup>
                        <span style={{ color: 'red' }}>{error.Name}</span>
                        <CardFooter className="p-4">
                          <Row>
                            <Col xs="12" sm="4">
                              <Button
                                type="submit"
                                onClick={AddNewPublisher}
                                className="btn btn-info mb-1"
                                block
                              >
                                <span>Add</span>
                              </Button>
                            </Col>
                            <Col xs="12" sm="4">
                              <Button
                                onClick={UpdateNewPublisher}
                                className="btn btn-info mb-1"
                                block
                              >
                                <span>Update</span>
                              </Button>
                            </Col>
                            <Col xs="12" sm="4">
                              <Button
                                onClick={DeleteNewPublisher}
                                className="btn btn-info mb-1"
                                block
                              >
                                <span>Delete</span>
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
          <div className="col-md-5">
            <div className="animated fadeIn">
              <Row>
                <Col>
                  <Card>
                    <CardHeader>
                      <h2 style={{ textAlign: "center" }}>
                        {" "}
                        <i className="fa fa-align-justify"></i> Publisher List
                      </h2>
                    </CardHeader>
                    <CardBody>
                      <Table
                        hover
                        bordered
                        striped
                        responsive
                        size="sm"
                        style={{ textAlign: "center" }}
                      >
                        <thead>
                          <tr>
                            <th>Publisher ID</th>
                            <th>Publisher Name</th>
                          </tr>
                        </thead>
                        <tbody>
                          {data &&
                            data.length > 0 &&
                            data.map((item, idx) => {
                              return (
                                <tr key={idx}>
                                  <td>{item.publisherID}</td>
                                  <td>{item.publisherName}</td>
                                </tr>
                              );
                            })}
                        </tbody>
                      </Table>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Publisher;
