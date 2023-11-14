import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/api';
import jwt from 'jsonwebtoken';


const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await loginUser({ email, password });
      const { user, token } = response.data;

      // Handle successful login
      console.log('Logged in user:', user);
      console.log('Token:', token);
      localStorage.setItem('token', token)
      const tokenNew = localStorage.getItem('token');
      const testToken = tokenNew;
      const decodedToken = jwt.verify(testToken, 'testing');
      //console.log("decoded TOken : " +   tokenNew);

      // Reset the form fields
      setEmail('');
      setPassword('');

      // Redirect to home page
      navigate('/tasks');
    } catch (error) {
      console.error('Login error:', error.response.data.message);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
