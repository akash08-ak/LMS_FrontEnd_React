import React, { useState, useEffect } from "react";
import memberService from "../../Dbservices/MemberServices";
import image from "../Images/Students.png";

import {
  Button,
  Card,
  CardBody,
  Col,
  CardHeader,
  Row,
  Table,
} from "reactstrap";

function Student(props) {
  const [data, setData] = useState([]);

  useEffect(() => {
    GetData();
  });

  //Get Student
  const GetData = () => {
    memberService.getAllMember().then((result) => {
      setData(result.data);
    });
  };

  // Delete Student
  const DeleteStudent = (ID) => {
    memberService.deleteMember(ID).then((result) => {
      GetData();
      if (result.data == "faild") alert("Student Not Preset");
      else if (result.data == "unable to delete")
        alert("Book is assign to member");
      else alert("Student Deleted successfully");
    });
  };

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="animated fadeIn">
              <Row>
                <Col>
                  <Card>
                    <CardHeader style={{ textAlign: "center" }}>
                      <center>
                        {" "}
                        <img width="70px" src={image} />
                      </center>
                      <h1>Students List</h1>
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
                            <th>Student Id</th>
                            <th>Student Name</th>
                            <th>Date Of Birth</th>
                            <th>Contact Number</th>
                            <th>Email </th>
                            <th>Address</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {data.map((item, idx) => {
                            return (
                              <tr key={idx}>
                                <td>{item.memberID}</td>
                                <td>{item.memberFullName}</td>
                                <td>{item.memberDOB}</td>
                                <td>{item.memberContactNo}</td>
                                <td>{item.memberEmail}</td>
                                <td>{item.memberFullAddress}</td>
                                <td>
                                  <div className="btn-group">
                                    <button
                                      className="btn btn-warning"
                                      onClick={() =>
                                        DeleteStudent(item.memberID)
                                      }
                                    >
                                      Delete
                                    </button>
                                  </div>
                                </td>
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

export default Student;
