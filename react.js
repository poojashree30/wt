import './App.css';
import Login from './components/login';
import AddBook from './components/Book';
import React, { useState, useEffect } from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Booklist from './components/Booklist';

function App() {
  const LOCAL_STORAGE_KEY = "Books";
  const [Books, setBooks] = useState([]);
  const addBookHandler = (Book)=>{
    console.log(Book);
    setBooks([...Books,Book]);
  }
  useEffect(() => {
    const retriveBooks = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (retriveBooks) setBooks(retriveBooks);
  }, []);
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(Books));
  }, [Books]);
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path='/' render={()=> <Login/>}>
          </Route>
          <Route exact path='/Book' render={()=> <AddBook addBookHandler={addBookHandler}/>}></Route>
          <Route  path='/Booklist' render={()=><Booklist Books={Books}/>}></Route>
        </Switch>
      </Router>
      {/* <Booklist books={books}></Booklist> */}
    </div>
  );
}

export default App;
////////////////
import React from "react";
import { useHistory } from "react-router-dom";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useState } from "react";




export default function Login() {
  const [name, setName] = useState("");
  const [Password, setPassword] = useState("");
  const history = useHistory();


  function validateForm() {
    return name.length > 0 && Password.length > 0;
  }

    const checkUser = (e) =>{
        e.preventDefault();
        if(name === 'reader' && Password === '123'){
            alert('Succesful')
            history.push('/book')
        }
        else{
            alert('Error')
        }
    }



  return (
    <div className="Login">
      <Form onSubmit={checkUser}>
        <h1>Welcome to kindle</h1>
        <h1>Login</h1>
        <Form.Group size="lg" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            autoFocus
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="Password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button block size="lg" type="submit" disabled={!validateForm()}>
          Login
        </Button>
      </Form>
    </div>
  );
}
/////////
import React, { useState } from 'react'
import { useHistory } from 'react-router';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    withRouter
  } from "react-router-dom";
import Booklist from './Booklist';

class Addbook extends React.Component
{
    routingFunction = (param) => {
        this.props.history.push({
            pathname: `/booklist`,
        });
    }
  state = {
  Title: "",Author: "",Publication: "", Genre: "",Rating: ""
  };
  add = (e) => {
    e.preventDefault();
    if (this.state.Title === "" || this.state.Author === ""|| this.state.Publication === ""|| this.state.Genre=== ""|| this.state.Rating === "") {
      alert("ALl the fields are mandatory!");
      return;
    }
    this.props.addBookHandler(this.state);
    this.setState({ Title: "", Author: "", Publication: "", Genre: "", Rating: "" });
  };
    render(){
        return(
            <div className="ui main">
                <h2>AddBooks</h2>
        <form className="ui form" onSubmit={this.add}>
          <div className="field">
            <label>Book Title</label>
    <input type="text" name="Title" placeholder="Title"
      value={this.state.Title}
     onChange={(e) => 
      this.setState({ Title: e.target.value })}
         />
          </div>
          <div className="field">
            <label>Author</label>
            <input
              type="text"
              name="Author"
              placeholder="Author"
              value={this.state.Author}
              onChange={(e) => this.setState({ Author: e.target.value })}
                 />
          </div>
          <div className="field">
            <label>Publication</label>
            <input
              type="text"
              name="Publication"
              placeholder="Publication"
              value={this.state.Publication}
              onChange={(e) => this.setState({ Publication: e.target.value })}
                 />
          </div>
          <div className="field">
            <label>Genre</label>
            <input
              type="text"
              name="Genre"
              placeholder="Genre"
              value={this.state.Genre}
              onChange={(e) => this.setState({ Genre: e.target.value })}
                 />
          </div>
          <div className="field">
            <label>Rating</label>
            <input
              type="text"
              name="Rating"
              placeholder="Rating"
              value={this.state.Rating}
              onChange={(e) => this.setState({ Rating: e.target.value })}
                 />
          </div>

          <button className="ui button blue">
                Add</button>
             <button className="ui button blue" onClick={this.routingFunction}>
                Display</button>
        </form>
      </div>
        )

    }
    
}
export default withRouter(Addbook);
//////////
import React from 'react'
import user from "../images/user.png";

const Booklist = (props) => {
    console.log(props);

    const renderBookList = props.Books.map((Book) => {
        return (
            <div className="item">
            <img className="ui avatar image" src={user} alt="user" />
       <div className="content">
        <div className="header"> {Book.name}</div>
        <div> {Book.Author} </div>
        <div> {Book.Publication} </div>
        <div> {Book.Genre} </div>
        <div> {Book.Rating} </div>

        </div>
    
    </div>        );
    });
            return(
        <div className="ui celled list">
    {renderBookList}        </div>
    );

}
export default Booklist;