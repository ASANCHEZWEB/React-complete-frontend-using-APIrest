// components/navbar/Navbar.js

import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Navbar extends Component {
  constructor(props){
    super(props);
    this.state = { loggedInUser: null };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState({...this.state,
       loggedInUser: nextProps["userInSession"]})
  }

  render(){
    if(this.state.loggedInUser){
      return(
        <nav className="nav-style">
          <ul>
            <li>Welcome, {this.state.loggedInUser.username}</li>
            <li>
              <Link to='/projects' style={{ textDecoration: 'none' }}>Projects</Link>
            </li>
          </ul>
        </nav>
      )
    } else {
      return (
        <div>
        <nav className="nav-style">
          <ul>
            <li><Link to='/signup' style={{ textDecoration: 'none' }}>Signup</Link></li>
          </ul>
        </nav>
        </div>
      )
    }
    }
  }
  export default Navbar;