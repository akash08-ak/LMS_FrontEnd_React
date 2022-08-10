import React, { useState, useEffect } from "react";
import BookService from "../../Dbservices/BookServices";
import image from "../Images/books1.png";

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

function MBooks(props) {
  const [data, setData] = useState([]);
  

  useEffect(() => {
    GetData();
  });

  //Get Books
  const GetData = () => {
    BookService.getAllBook().then((result) => {
      setData(result.data);
    });
  };
 

  return (
    <div>
      <center>
      <div className="col-md-7">
        <div className="animated fadeIn">
          <Row>
            <Col>
              <Card>
                <CardHeader>,
                <center>
                          {" "}
                          <img width="70px" src={image} />
                          </center>
                  <h2 style={{ textAlign: "center" }}>
                    {" "}
                    <i className="fa fa-align-justify"></i>  Available Books
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
                        <th>Book ID</th>
                        <th>Book Name</th>
                        <th>Author ID</th>
                        <th>Pulisher ID</th>
                        <th>Language</th>
                        <th>Book Cost</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((item, idx) => {
                        return (
                          <tr key={idx}>
                            <td>{item.bookID}</td>
                            <td>{item.bookName}</td>
                            <td>{item.authorID}</td>
                            <td>{item.publisherID}</td>
                            <td>{item.booKLanguage}</td>
                            <td>{item.bookCost}</td>
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
      </center>
    </div>
  );
}

export default MBooks;
