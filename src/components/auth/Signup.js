import React, { Component } from 'react';
import AuthService from './auth-service';

import { Link } from 'react-router-dom';

class Signup extends Component {
  constructor(props){
    super(props);
    this.state = { username: '', password: '' };
    this.service = new AuthService();
  }

  //este metodo llama al servicio y hace un post con los datos del state.
  handleFormSubmit = (event) => {
    event.preventDefault();
    const username = this.state.username;
    const password = this.state.password;
  
    this.service.signup(username, password)
    .then( response => {
        this.setState({
          //aqui dejamos vacio el state despues de guardar el user
            username: "", 
            password: "",
        });
         this.props.getUser(response)
    })
    .catch( error => console.log(error) )
  }
  
  //esto recibe el input del form y lo actualiza rápido
  handleChange = (event) => {  
    const {name, value} = event.target;
    this.setState({[name]: value});
  }

 render(){
  return(
    <div>
      <form onSubmit={this.handleFormSubmit}>
        <label>Username:</label>
        <input type="text" name="username" value={this.state.username} onChange={ e => this.handleChange(e)}/>
        
        <label>Password:</label>
        <textarea name="password" value={this.state.password} onChange={ e => this.handleChange(e)} />
        
        <input type="submit" value="Signup" />
      </form>

      <p>Already have account? 
          <Link to={"/"}> Login</Link>
      </p>

    </div>
  )
}
}

export default Signup;