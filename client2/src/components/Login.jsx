import React, { Component } from 'react';
import './login.css';

class LoginForm extends Component {
  constructor(props) {
    super();
    this.state = {
      email: '',
      password: '',
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    var name = event.target.name;
    var value = event.target.value;
    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    fetch('/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password
      })
    })
    .then((response) => response.json())
    .then((responseJson) => {
      if(responseJson.error) {
        this.fail.style.display = "block";
      } else {
        window.location.href = "/home"
      }
      console.log(responseJson);
      // var isLoggedIn = responseJson.rows[0].exists;
      // if(isLoggedIn) {
      //   window.location.href = "/home"
      // } else {
      //   this.fail.style.display = "block";
      // }
    })
    .catch((error) => {
      console.log(error);
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
          <input
            className="loginInput"
            type="email"
            name="email"
            placeholder="Email Address"
            onChange={this.handleInputChange}
            value={this.state.email}
            required
          />
          <input
            className="loginInput"
            type="password"
            name="password"
            placeholder="Password"
            onChange={this.handleInputChange}
            value={this.state.password}
            required
          />
          <div
            className="fail"
            style={{display: 'none'}}
            ref={(fail) => {this.fail = fail}}
          >
            The email address or password you entered is incorrect
          </div>
          <button className="loginBtn" type="submit">Log In</button>
      </form>

    )
  }
}

class RegisterForm extends Component {
  constructor(props) {
    super();
    this.state = {
      email: '',
      username: '',
      password1: '',
      password2: ''
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    fetch('/users', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: this.state.email,
        username: this.state.username,
        password: this.state.password2
      })
    })
    .then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson);
      if(responseJson.error) {
        if(responseJson.error === 'email_taken') {
          this.failEmail.style.display = "block";
          this.failUsername.style.display = "none";
        } else if(responseJson.error === 'username_taken') {
          this.failUsername.style.display = "block";
          this.failEmail.style.display = "none";
        }
      } else {
        window.location.href = "/home"
      }
    })
    .catch((error) => {
      console.log(error);
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    if(nextState.password1 !== this.state.password1) {
      if(nextState.password1 === '' ) {
        this.password1Input.setCustomValidity('Please fill out this field.');
      } else {
        this.password1Input.setCustomValidity('');
        if(this.state.password2 !== '' && this.state.password1 !== nextState.password2) {
          this.password2Input.setCustomValidity('Passwords need to match');
        } else {
          this.password1Input.setCustomValidity('');
          this.password2Input.setCustomValidity('');
        }
      }
    } else if(this.state.password1 !== '' && nextState.password2 !== this.state.password2) {
      if(nextState.password2 === '') {
        this.password2Input.setCustomValidity('Please fill out this field.');
      } else {
        this.password2Input.setCustomValidity('');
        if(this.state.password1 !== nextState.password2) {
          this.password2Input.setCustomValidity('Passwords need to match');
        } else {
          this.password1Input.setCustomValidity('');
          this.password2Input.setCustomValidity('');
        }
      }
    }
    return true;
  }

  handleInputChange(event) {
    var name = event.target.name;
    var value = event.target.value;
    this.setState((prevState, props) => {
      return {[name]: value};
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} >
        <input
          className="loginInput"
          type="email"
          name="email"
          placeholder="Email Address"
          onChange={this.handleInputChange}
          value={this.state.email}
          required
        />
        <input
          className="loginInput"
          type="text"
          name="username"
          placeholder="Username"
          maxLength="30"
          onChange={this.handleInputChange}
          value={this.state.username}
          required
        />
        <input
          className="loginInput" type="password"
          name="password1" placeholder="Password"
          onChange={this.handleInputChange}
          value={this.state.password1}
          ref={(input) => {this.password1Input = input;}}
          required
        />
        <input
          className="loginInput"
          type="password"
          name="password2"
          placeholder="Confirm Password"
          onChange={this.handleInputChange}
          value={this.state.password2}
          ref={(input) => {this.password2Input = input;}}
          required
        />
        <div
          className="fail"
          style={{display: 'none'}}
          ref={(failEmail) => {this.failEmail = failEmail}}
        >
          The email address is already registered.
        </div>
        <div
          className="fail"
          style={{display: 'none'}}
          ref={(failUsername) => {this.failUsername = failUsername}}
        >
          The username chosen is already taken.
        </div>
        <button className="loginBtn" type="submit">Sign Up</button>
      </form>
    )
  }
}

class Login extends Component {
  constructor() {
    super();
    this.state = {
      isLogin: true,
    }
    this.switch = this.switch.bind(this);
  }

  componentDidMount() {
    document.body.className="bodyLogin";
  }

  switch() {
    this.setState(prevState => ({
      isLogin: !prevState.isLogin
    }));
  }

  renderLogin() {
    return (
      <div className="loginDiv">
        <span>Login into 4UM</span>
        <LoginForm/>
        <div className="switchDiv" onClick={this.switch}>Create an Account</div>
      </div>
    )
  }

  renderRegister() {
    return (
      <div>
        <span>Create an Account</span>
        <RegisterForm/>
        <div className="switchDiv" onClick={this.switch}>Already have an account? Login</div>
      </div>
    );
  }

  render() {
    return (
      <div className="outer">
        <div className="middle">
          <div className="loginDiv">
            {this.state.isLogin ? this.renderLogin() : this.renderRegister()}
          </div>
        </div>
      </div>

    );
  }
}

export default Login;
