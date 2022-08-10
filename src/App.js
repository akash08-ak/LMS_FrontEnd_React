import React from "react";
import Background from "./Components/Images/Background.jpg";
import Publisher from "./Components/Admin/Publisher";
import Author from "./Components/Admin/Author";
import MBooks from "./Components/Member/MBooks";
import Books from "./Components/Admin/Books";
import Profile from "./Components/Member/Profile";
import MyBooks from "./Components/Member/MyBooks";
import IssueBook from "./Components/Admin/IssueBook";
import StudentLogin from "./Components/Member/StudentLogin";
import Login from "./Components/Admin/Login";
import Student from "./Components/Admin/Student";
import Home from "./Components/Home";
import Register from "./Components/Member/Register";
import NavigationBar from "./Components/Navigation";
import "react-bootstrap/dist/react-bootstrap.min.js";
import { BrowserRouter as Router, Route } from "react-router-dom";

var sectionStyle = {
  width: "100%",
  height: "850px",
  backgroundImage: `url(${Background})`
};



function App() {

  
  return (

   
    <div style={sectionStyle}>

      <Router>
        <NavigationBar />
        <Route exact path="/" component={Home}></Route>
        <Route exact path="/Home" component={Home}></Route>
        <Route path="/publisher" component={Publisher}></Route>
        <Route path="/Author" component={Author}></Route>
        <Route path="/Books" component={Books}></Route>
        <Route path="/member/Books" component={MBooks}></Route>
        <Route path="/MyBooks" component={MyBooks}></Route>
        <Route path="/Student" component={Student}></Route>
        <Route path="/Login" component={Login}></Route>
        <Route path="/Register" component={Register}></Route>
        <Route path="/IssueBook" component={IssueBook}></Route>
        <Route path="/StudentLogin" component={StudentLogin}></Route>
        <Route path="/Profile" component={Profile}></Route>
      </Router>
    </div>

  );
}
export default App;
