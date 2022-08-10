import React, { useState, useEffect } from "react";
import BookService from "../../Dbservices/BookServices";
import memberService from "../../Dbservices/MemberServices";
import IbookService from "../../Dbservices/IssuebookServices";
import image from "../Images/IBook.png";

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

function IssueBook(props) {
  const [Books, setBooks] = useState([]);
  const [IBooks, setIBooks] = useState([]);
  const [Stud, Setstud] = useState([]);
  const [IBook, setIbook] = useState({
    MID: "",
    MName: "",
    BID: "",
    BName: "",
    IDate: "",
    DDate: "",
  });

  useEffect(() => {
    GetBook();
    Getstud();
    GetIBooks();
  }, []);

  const GetBook = () => {
    BookService.getAllBook().then((result) => {
      setBooks(result.data);
    });
  };

  const Getstud = () => {
    memberService.getAllMember().then((result) => {
      Setstud(result.data);
    });
  };

  const GetIBooks = () => {
    IbookService.getAllIBook().then((result) => {
      setIBooks(result.data);
    });
  };

  const IssueBook = (e) => {
    e.preventDefault();
    const data = {
      issueBookId: 0,
      memberID: IBook.MID,
      memberFullName: IBook.MName,
      bookID: IBook.BID,
      bookName: IBook.BName,
      bookIssueDate: IBook.IDate,
      bookDueDate: IBook.DDate,
    };
    IbookService.createIBook(data).then((result) => {
      GetIBooks();
      if (result.data == "faild") alert("This Book Already Issued to this member");
      else alert("Book Issue successfully");
    });
  };

  const DeleteIssueBook = (ID) => {
    IbookService.deleteIBook(ID).then((result) => {
      GetIBooks();
      if (result.data == "faild") alert("Unable to return Book");
      else alert("Book Return successfully");
    });
  };

  const onChange = (e) => {
    e.persist();
    setIbook({ ...IBook, [e.target.name]: e.target.value });
  };

  const onmemChange = (e) => {
    e.persist();
    const result = Stud.find(({ memberID }) => memberID === e.target.value);
    const result1 = result.memberFullName;
    setIbook({ ...IBook, [e.target.name]: e.target.value, MName: result1 });
  };

  const onbookChange = (e) => {

      const result = Books.find(({ bookID }) => bookID === e.target.value);
      const result1 = result.bookName;
      setIbook({ ...IBook, [e.target.name]: e.target.value, BName: result1 });
      e.persist();
   
  };
  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <Container>
              <Row className="justify-content-center">
                <Col md="12" lg="10" xl="8">
                  <Card className="mx-4">
                    <CardHeader style={{ textAlign: "center" }}>
                      <center>
                        {" "}
                        <img width="100px" src={image} />
                        <h3 style={{ textAlign: "center" }}>Issue Books</h3>
                      </center>
                    </CardHeader>
                    <CardBody className="p-4">
                      <Form>
                        <label className="mb-1">Select Member ID : </label>
                        <InputGroup className="mb-1">
                          <select onChange={onmemChange} name="MID" className="col-md-12">
                          <option>-- Select Member --</option>
                            {Stud.map((item) => {
                              return (
                                <option
                                  value={item.memberID}
                                  key={item.memberID}
                                >
                                  {item.memberID} : {item.memberFullName}
                                </option>
                              );
                            })}
                          </select>
                        </InputGroup>
                        <label className="mb-1">Select Book ID : </label>
                        <InputGroup className="mb-1">
                          <select onChange={onbookChange} name="BID" className="col-md-12" >
                          <option>-- Select Book --</option>
                            {Books.map((item) => {
                              return (
                                <option value={item.bookID} key={item.bookID}>
                                  {item.bookID} : {item.bookName}
                                </option>
                              );
                            })}
                          </select>
                        </InputGroup>
                        <label className="mb-1">Enter Issue Date :</label>
                        <InputGroup className="mb-1">
                          <Input
                            type="date"
                            placeholder="Issue Date"
                            name="IDate"
                            id="IDate"
                            value={IBook.IDate}
                            onChange={onChange}
                          />
                        </InputGroup>
                        <label className="mb-1">Enter Due Date :</label>
                        <InputGroup className="mb-1">
                          <Input
                            type="date"
                            placeholder="Due Date"
                            name="DDate"
                            id="DDate"
                            value={IBook.DDate}
                            onChange={onChange}
                          />
                        </InputGroup>
                        <CardFooter className="p-4">
                          <Row>
                            <Col xs="12" sm="12">
                              <Button
                                type="submit"
                                onClick={IssueBook}
                                className="btn btn-info mb-1"
                                block
                              >
                                <span>Issue Book</span>
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
          <div className="col-md-6">
            <div className="animated fadeIn">
              <Row>
                <Col>
                  <Card>
                    <CardHeader>
                      <h2 style={{ textAlign: "center" }}>
                        {" "}
                        <i className="fa fa-align-justify"></i>Issue Books List
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
                            <th>Member ID</th>
                            <th>Member Name</th>
                            <th>Book ID</th>
                            <th>Book Name</th>
                            <th>Book Issue Date</th>
                            <th>Book Due Date</th>
                            <th>Return Book</th>
                          </tr>
                        </thead>
                        <tbody>
                          {IBooks.map((item, idx) => {
                            return (
                              <tr key={idx}>
                                <td>{item.memberID}</td>
                                <td>{item.memberFullName}</td>
                                <td>{item.bookID}</td>
                                <td>{item.bookName}</td>
                                <td>{item.bookIssueDate}</td>
                                <td>{item.bookDueDate}</td>
                                <td>
                                  <div className="btn-group">
                                    <button
                                      className="btn btn-warning"
                                      onClick={() =>
                                        DeleteIssueBook(item.issueBookId)
                                      }
                                    >
                                      Return
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

export default IssueBook;
