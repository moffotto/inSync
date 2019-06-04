import React, { Component } from 'react';
import './App.css';
import logo from './img/cube_icon_2.png';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Landing } from './pages/Landing/Landing';
import { Login } from './pages/Login/Login';
import { Portal } from './pages/Portal/Portal';
import { Navbar, Nav, Image, Row } from 'react-bootstrap';
import PrivatePortal from './components/PrivatePortal';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuthenticated: false,
      user: { firstName: "", photoURL: "", lastName: "", userName: "" }
    }

    this.handleSignOut = this.handleSignOut.bind(this);
    this.handleSignIn = this.handleSignIn.bind(this);
  }

  componentDidMount() {
    if (window.localStorage.getItem("Authorization") !== null) this.handleSignIn();
  }

  handleSignIn() {
    this.setState({
      isAuthenticated: true,
      user: JSON.parse(window.localStorage.getItem("User"))
    });
  }

  handleSignOut() {
    this.setState({
      isAuthenticated: false,
      user: { firstName: "", photoURL: "", lastName: "", userName: "" }
    });
  }

  render() {
    return (

      <Router basename="inSync">
        <div>
          <header>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
              <Navbar.Brand><Link to={(this.state.isAuthenticated) ? "/portal" : "/"} className="navLinks white-text">C U B E <Image src={logo} alt="Logo" /> R U L E</Link></Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto" />
                <Nav>
                  {(this.state.isAuthenticated) ? <Row>
                    <div className="white-text app__username-text">
                      Hello, {this.state.user.firstName}!
                    </div>
                      <div className="app__profile-img-container">
                        <Image src={this.state.user.photoURL} thumbnail className="app__profile-img" />
                      </div>
                    
                  </Row> : <Link to="/portal" className="navLinks white-text">Sign In</Link>}
                </Nav>
              </Navbar.Collapse>
            </Navbar>
          </header>

          <main>
            <Switch>
              <Route exact path="/" component={Landing} />
              <Route exact path="/login" render={(props) => <Login {...props} isAuthed={this.state.isAuthenticated} handleSignIn={() => this.handleSignIn()} />} />
              <PrivatePortal path="/portal" component={Portal} user={this.state.user} isAuthed={this.state.isAuthenticated} handleSignOut={() => this.handleSignOut()} />
            </Switch>
          </main>

        </div>
      </Router>
    );
  }
}

export default App;
