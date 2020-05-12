// App.js

import React, { Component } from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import ProjectList from "./components/projects/ProjectList";
import Navbar from "./components/navbar/Navbar";
import ProjectDetails from "./components/projects/ProjectDetails";
// import TaskDetails from "./components/tasks/TaskDetails";
import Signup from "./components/auth/Signup";
import AuthService from './components/auth/auth-service';
import Login from './components/auth/Login';

class App extends Component {

  constructor(props){
    super(props)
    //guardaremos el usuario en el estado para mantenerlo conectado
    this.state = { loggedInUser: null };
    //esta es la instancia del servicio que contiene las rutas
    this.service = new AuthService();
  }
  
//Este metodo hace un get a loggedin para saber si estamos conectados.
  fetchUser(){
    if( this.state.loggedInUser === null ){
      this.service.loggedin()
      .then(response =>{
        //aqui actualizamos el objeto user del estado
        this.setState({
          loggedInUser:  response
        }) 
      })
      .catch( err =>{
        this.setState({
          loggedInUser:  false
        }) 
      })
    }
  }
//este metodo recibe el objeto user del formulario signup y actualiza state
  getTheUser= (userObj) => {
    this.setState({
      loggedInUser: userObj
    })
  }



  render() {
    this.fetchUser()
    // Si está conectado pinta esto , sino el else
    if(this.state.loggedInUser){
      return (
        <div className="App">
          <Navbar userInSession={this.state.loggedInUser} />
          <Switch>
            <Route exact path="/projects" component={ProjectList}/>
            <Route exact path="/projects/:id" component={ProjectDetails} />
          </Switch>
        </div>
      );
    } else {
      return (
        <div className="App">
          <Navbar userInSession={this.state.loggedInUser} />
          <Switch>
          <Route exact path='/' render={() => <Login getUser={this.getTheUser}/>}/>
          {/* En esta ruta pasamos getTheUser y recibimos el user. */}
            <Route exact path='/signup' render={() => <Signup getUser={this.getTheUser}/>}/>
            <Route exact path="/projects" component={ProjectList}/>
            <Route exact path="/projects/:id" component={ProjectDetails} />
          </Switch>
        </div>
      );
    }
  }
}
export default App;