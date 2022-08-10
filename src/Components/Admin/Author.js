import React, { useState, useEffect } from "react";
import authorService from "../../Dbservices/AuthorServices";
import image from "../Images/writer.png";

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

function Author(props) {
  const [data, setData] = useState([]);
  const [Auth, setAuth] = useState({ ID: "", Name: "" });
  const [error, seterror] = useState({ ID: "", Name: "" });


  useEffect(() => {
    GetData();
  });

  //Get Author
  const GetData = () => {
    authorService.getAllAuthor().then((result) => {
      setData(result.data);
    });
  };

  // Add Author
  const AddNewAuthor = (e) => {
    e.preventDefault();
    const data = { authorID: Auth.ID, authorName: Auth.Name };
    if (!Auth.ID) {
      error["ID"] =   "Author ID is required..! ";
    }
    else if (!Auth.Name) {
      error["Name"] =   "Author Name is required..! ";
    }
    else{
      authorService.createAuthor(data).then((result) => {
        GetData();
        
        if (result.data == "faild") alert("Author already present");
        else alert("Author Added successfully");
      });
    }
   
  };

  // Update Author
  const UpdateNewAuthor = (e) => {
    e.preventDefault();
    const data = {
      authorID: Auth.ID,
      authorName: Auth.Name,
    };
    if (!Auth.ID) {
      error["ID"] =   "Author ID is required..! ";
      
    }
    else if (!Auth.Name) {
      error["Name"] =   "Author Name is required..! ";
    }
    else{
    authorService.updateAuthor(data).then((result) => {
      GetData();
      if (result.data == "faild") alert("Author Not Preset");
      else alert("Author Updated successfully ");
    });
  }
  };

  // Delete Author
  const DeleteNewAuthor = () => {
    if (!Auth.ID) {
      error["ID"] =   "Author ID is required..! ";
    }
    else  {
      authorService.deleteAuthor(Auth.ID).then((result) => {
        GetData();
        console.log(result.dat)
        if (result.data == "faild") alert("Author Not Preset");
        else if(result.data == "unable to delete") alert("Author may be assign");
        else alert("Author Deleted successfully");
      });
    }
    
    
  };

  const onChange = (e) => {
    e.persist();
    setAuth({ ...Auth, [e.target.name]: e.target.value });
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
                        <h3 style={{ textAlign: "center" }}>Author</h3>
                      </center>
                    </CardHeader>
                    <CardBody className="p-4">
                      <Form>
                      <label className="mb-2">Enter Author ID :</label>
                        <InputGroup className="mb-2">                      
                          <Input
                            type="text"
                            required
                            name="ID"
                            id="ID"
                            placeholder="ID"
                            value={Auth.ID}
                            onChange={onChange}
                          />
                        </InputGroup>
                        <span style={{ color: 'red' }} >{error.ID}</span><br/>
                        
                        <label className="mb-2">Enter Author Name :</label>
                        <InputGroup className="mb-2">
                          <Input
                            type="text"
                            required
                            placeholder="Name"
                            name="Name"
                            id="Name"
                            value={Auth.Name}
                            onChange={onChange}
                          />
                        </InputGroup>
                        <span style={{ color: 'red' }}>{error.Name}</span>
                        <CardFooter className="p-4">
                          <Row>
                            <Col xs="12" sm="4">
                              <Button
                                type="submit"
                                onClick={AddNewAuthor}
                                className="btn btn-info mb-1"
                                block
                              >
                                <span>Add</span>
                              </Button>
                            </Col>
                            <Col xs="12" sm="4">
                              <Button
                                onClick={UpdateNewAuthor}
                                className="btn btn-info mb-1"
                                block
                              >
                                <span>Update</span>
                              </Button>
                            </Col>
                            <Col xs="12" sm="4">
                              <Button
                                onClick={DeleteNewAuthor}
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
                        <i className="fa fa-align-justify"></i> Authors List
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
                            <th>Author ID</th>
                            <th>Author Name</th>
                          </tr>
                        </thead>
                        <tbody>
                          {data &&
                            data.length > 0 &&
                            data.map((item, idx) => {
                              return (
                                <tr key={idx}>
                                  <td>{item.authorID}</td>
                                  <td>{item.authorName}</td>
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

export default Author;
