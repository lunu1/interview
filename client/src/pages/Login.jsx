import React, { useState } from 'react';
import { Link, Form, redirect, useNavigation } from 'react-router-dom';
import Wrapper from '../assets/wrappers/RegisterAndLoginPage';
import { Logo } from '../components';
import axios from 'axios'; 
import { toast } from 'react-toastify'; 
import { useNavigate } from 'react-router-dom'; 

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3333/login', {
        email,
        password,
      });

      const { token,name } = response.data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('username', name);


      toast.success('Login successful');
      navigate('/dashboard'); 

    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <Wrapper>
      <form className='form' onSubmit={handleSubmit}>
        <Logo />
        <h4>login</h4>

        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            className='form-input'
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='form-input'
            required
          />
        </div>

        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit" className='btn btn-block'>
          Login
        </button>
        
         <p>Create New Account? <Link to='/register'>Signup</Link></p>
      </form>
    </Wrapper>
  );
}

export default Login;
