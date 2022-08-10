import React, { useState, useEffect } from "react";
import IbookService from "../../Dbservices/IssuebookServices";
import image from "../Images/IBook.png";

import {
  Button,
  Card,
  CardBody,
  Col,
  CardHeader,
  Row,
  Table,
} from "reactstrap";

function MyBooks(props) {
  const [data, setData] = useState([]);
  const user = localStorage.getItem("username");

  useEffect(() => {
    GetData();
  });

  //Get Books
  const GetData = () => {
    IbookService.getAllIBook().then((result) => {
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
                  <CardHeader>
                  <center>
                        {" "}
                        <img width="70px" src={image} />
                        <h3 style={{ textAlign: "center" }}>Assigned Books</h3>
                      </center>
                   
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
                          <th>Member ID</th>
                          <th>Member Name</th>
                          <th>Book ID</th>
                          <th>Book Name</th>
                          <th>Book Issue Date</th>
                          <th>Book Due Date</th>
                                                 </tr>
                      </thead>
                      <tbody>
                        {data
                          .filter((data) => data.memberID === user)
                          .map((item, idx) => {
                            return (
                              <tr key={idx}>
                                <td>{item.memberID}</td>
                                <td>{item.memberFullName}</td>
                                <td>{item.bookID}</td>
                                <td>{item.bookName}</td>
                                <td>{item.bookIssueDate}</td>
                                <td>{item.bookDueDate}</td>
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

export default MyBooks;
