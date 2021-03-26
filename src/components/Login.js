import React, { useState } from "react";
import axios from "axios";
import { useHistory } from 'react-router';

const initialValues = { username: '', password: '', error: '', }

const Login = () => {
  const { push } = useHistory();
  const [formValues, setFormValues] = useState(initialValues);

  const handleChanges = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:5000/api/login', formValues)
      .then((res) => {
        window.localStorage.setItem('token', res.data.payload);
        push('/colors')
      })
      .catch((err) => {
        console.log(err)
        setFormValues({...formValues, error: 'Username or Password not valid.'})
      });
  };

  return (
    <section>
      <h1>Welcome to the Bubble App!<br/><br/>Log in, please:</h1>
      <div>
        <form onSubmit={handleSubmit}>
          <label htmlFor='username'>Username</label>
          <input
            id='username'
            name='username'
            value={formValues.username}
            onChange={handleChanges}
          />
          <label htmlFor='password'>Password</label>
          <input
            id='password'
            name='password'
            type='password'
            value={formValues.password}
            onChange={handleChanges}
          />
          {formValues.error && <p><strong>{formValues.error}</strong></p>}
          <button>Login</button>
        </form>
      </div>
    </section>
  );
};

export default Login;

//Task List:
//1. Build a form containing a username and password field.
//2. Add whatever state nessiary for form functioning.
//3. MAKE SURE THAT FORM INPUTS INCLUDE THE LABEL TEXT "username" and "password" RESPECTIVELY.
//4. If either the username or password is not displaied display EXACTLY the following words: Username or Password not valid.
//5. If the username / password is equal to Lambda School / i<3Lambd4, save that token to localStorage.