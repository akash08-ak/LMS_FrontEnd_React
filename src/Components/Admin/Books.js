import React, { useState, useEffect } from "react";
import BookService from "../../Dbservices/BookServices";
import authorService from "../../Dbservices/AuthorServices";
import publisherService from "../../Dbservices/PublisherServices";
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

function Books(props) {
  const [Books, setBooks] = useState([]);
  const [Publisher, setpublisher] = useState([]);
  const [Author, setauthor] = useState([]);
  const [Book, Setbook] = useState({
    ID: "",
    Name: "",
    AuthorID: "",
    PublisherID: "",
    Language: "",
    Cost: "",
  });

  const GetBook = () => {
    BookService.getAllBook().then((result) => {
      setBooks(result.data);
    });
  };

  const GetPublisher = () => {
    publisherService.getAllpublisher().then((result) => {
      setpublisher(result.data);
    });
  };

  const GetAuthor = () => {
    authorService.getAllAuthor().then((result) => {
      setauthor(result.data);
    });
  };

  //Get Author
  useEffect(() => {
    GetBook();
    GetPublisher();
    GetAuthor();
  }, []);

  const AddNewBook = (e) => {
    e.preventDefault();
    const data = {
      bookID: Book.ID,
      bookName: Book.Name,
      authorID: Book.AuthorID,
      publisherID: Book.PublisherID,
      booKLanguage: Book.Language,
      bookCost: Book.Cost,
    };
    if (!Book.ID) {
      Book["ID"] = "hi";
      console.log(Book.ID)
      
    } else {
      BookService.createBook(data).then((result) => {
        GetBook();
        if (result.data == "faild") alert("Book already present");
        else alert("Book Added successfully");
      });
    }
  };

  // Update Book
  const UpdateBook = (e) => {
    e.preventDefault();
    const data = {
      bookID: Book.ID,
      bookName: Book.Name,
      authorID: Book.AuthorID,
      publisherID: Book.PublisherID,
      booKLanguage: Book.Language,
      bookCost: Book.Cost,
    };
    BookService.updateBook(data).then((result) => {
      GetBook();
      if (result.data == "faild") alert("Book Not Preset");
      else alert("Book Updated successfully ");
    });
  };

  // Delete Book
  const DeleteBook = () => {
    BookService.deleteBook(Book.ID).then((result) => {
      GetBook();
      if (result.data == "faild") alert("Book Not Preset");
      else if (result.data == "unable to delete") alert("Book may be assign");
      else alert("Book Deleted successfully");
    });
  };
  const onChange = (e) => {
    e.persist();
    Setbook({ ...Book, [e.target.name]: e.target.value });
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
                        <h3 style={{ textAlign: "center" }}>Books</h3>
                      </center>
                    </CardHeader>
                    <CardBody className="p-4">
                      <Form>
                        <label className="mb-1">Enter Book ID :</label>
                        <InputGroup className="mb-1">
                          <Input
                            type="text"
                            name="ID"
                            id="ID"
                            placeholder="ID"
                            value={Book.ID}
                            onChange={onChange}
                          />
                        </InputGroup>
                        <label className="mb-1">Enter Book Name :</label>
                        <InputGroup className="mb-1">
                          <Input
                            type="text"
                            placeholder="Name"
                            name="Name"
                            id="Name"
                            value={Book.Name}
                            onChange={onChange}
                          />
                        </InputGroup>

                        <InputGroup className="mb-1">
                          <label>Select Book Author :</label> &nbsp;
                          <select
                            onChange={onChange}
                            name="AuthorID"
                            className="col-md-12 "
                          >
                            <option>-- Select Author --</option>
                            {Author.map((item) => {
                              return (
                                <option
                                  value={item.authorID}
                                  key={item.authorID}
                                >
                                  {item.authorID} : {item.authorName}
                                </option>
                              );
                            })}
                          </select>
                        </InputGroup>
                        <InputGroup className="mb-1">
                          <label>Select Book Publisher :</label> &nbsp;
                          <select
                            onChange={onChange}
                            name="PublisherID"
                            className="col-md-12"
                          >
                            <option>-- Select Publisher --</option>
                            {Publisher.map((item) => {
                              return (
                                <option
                                  value={item.publisherID}
                                  key={item.publisherID}
                                >
                                  {item.publisherID} : {item.publisherName}
                                </option>
                              );
                            })}
                          </select>
                        </InputGroup>
                        <label className="mb-1">Enter Book Language :</label>
                        <InputGroup className="mb-1">
                          <Input
                            type="text"
                            placeholder="Language"
                            name="Language"
                            id="Language"
                            value={Book.Language}
                            onChange={onChange}
                          />
                        </InputGroup>
                        <label className="mb-1">Enter Book Cost :</label>
                        <InputGroup className="mb-1">
                          <Input
                            type="text"
                            placeholder="Cost"
                            name="Cost"
                            id="Cost"
                            value={Book.Cost}
                            onChange={onChange}
                          />
                        </InputGroup>
                        <CardFooter className="p-4">
                          <Row>
                            <Col xs="12" sm="4">
                              <Button
                                type="submit"
                                onClick={AddNewBook}
                                className="btn btn-info mb-1"
                                block
                              >
                                <span>Add</span>
                              </Button>
                            </Col>
                            <Col xs="12" sm="4">
                              <Button
                                onClick={UpdateBook}
                                className="btn btn-info mb-1"
                                block
                              >
                                <span>Update</span>
                              </Button>
                            </Col>
                            <Col xs="12" sm="4">
                              <Button
                                onClick={DeleteBook}
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
                        <i className="fa fa-align-justify"></i> Books List
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
                            <th>Book Language</th>
                            <th>Book Cost</th>
                          </tr>
                        </thead>
                        <tbody>
                          {Books.map((item, idx) => {
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
        </div>
      </div>
    </div>
  );
}

export default Books;
