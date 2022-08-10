import React from "react";
import { Navbar, Nav ,NavDropdown} from "react-bootstrap";
import { useHistory } from "react-router-dom";
function NavigationBar() {
  const history = useHistory();
  function logout() {
    localStorage.clear();
    history.push("/Home");
    window.location.reload(false);
  }

  var user = "Admin"; //localStorage.getItem("user-info");

  if (user == "Admin") {
    return (
      <header>
        <Navbar bg="dark" expand="lg" variant="dark">
          <Navbar.Brand href="/">LMS</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-left">
              <Nav.Link href="/Home">Home</Nav.Link>
              <Nav.Link href="/publisher">Publisher</Nav.Link>
              <Nav.Link href="/Author">Author</Nav.Link>
              <Nav.Link href="/Books">Books</Nav.Link>
              <Nav.Link href="/IssueBook">IssueBook</Nav.Link>
            </Nav>
            <Nav className="ms-auto">
              <Nav.Link href="/Student">Students</Nav.Link>
              <Nav.Link onClick={logout}>LogOut</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </header>
    );
  } else if (user == "Student") {
    return (
      <header>
        <Navbar bg="dark" expand="lg" variant="dark">
          <Navbar.Brand href="/">LMS</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-left">
              <Nav.Link href="/Home">Home</Nav.Link>
              <Nav.Link href="/member/Books">Books</Nav.Link>
              <Nav.Link href="/MyBooks">MyBooks</Nav.Link>
            </Nav>
            <Nav className="ms-auto">
              <Nav.Link href="/Profile">Edit Profile</Nav.Link>
              <Nav.Link onClick={logout}>LogOut</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </header>
    );
  } else {
    return (
      <header>
        <Navbar bg="dark" expand="lg" variant="dark">
          <Navbar.Brand href="/">LMS</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-left">
              <Nav.Link href="/Home">Home</Nav.Link>
            </Nav>
            <Nav className="ms-auto" bg="dark">
              <NavDropdown title="Login"  >
                <NavDropdown.Item href="/Login">Admin</NavDropdown.Item> 
                <NavDropdown.Item href="/StudentLogin">Student</NavDropdown.Item>                
              </NavDropdown>
              <Nav.Link href="/Register">Register</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </header>
    );
  }
}
export default NavigationBar;
