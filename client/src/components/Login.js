import React, { useState } from "react";
import { axiosWithAuth } from '../utils/axiosWithAuth';
import { Redirect, useHistory } from 'react-router-dom';

const Login = () => {
  const {push} = useHistory();
  const [credentials, setCredentials]= useState({
    username: '',
    password: ''
  });
  const changeHandler = e => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  }
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const loginHandler = e => {
    e.preventDefault();
    axiosWithAuth()
    .post('/login', credentials)
    .then(res => {
      localStorage.setItem('token', res.data.payload)
      push('/protected');
    })
    .catch(err => console.log({err}))
  }
  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <form onSubmit={loginHandler}>
        <input
          name="username"
          type="text"
          placeholder="Username"
          value={credentials.username}
          onChange={changeHandler}
        />
        <input
          name="password"
          type="text"
          placeholder="Password"
          value={credentials.password}
          onChange={changeHandler}
        />
        <button type="submit">Login</button>
      </form>
    </>
  );
};

export default Login;
