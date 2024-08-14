import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Wrapper from '../assets/wrappers/RegisterAndLoginPage';
import {  Logo } from '../components';
import axios from 'axios'; 
import { toast } from 'react-toastify'; 
import { useNavigate } from 'react-router-dom'; 

function Register() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [emailError, setEmailError] = useState('');


  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };


  const handleEmailChange = (e) => {
    const emailValue = e.target.value;
    setEmail(emailValue);
  
    if (!validateEmail(emailValue)) {
      setEmailError('Please enter a valid email address');
    } else {
      setEmailError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3333/signup', {
        name,
        email,
        password,
      });

     

      toast.success('Register Successfull');
      navigate('/login'); 

    } catch (err) {
      setError(err.response?.data?.message || 'signup failed');
    }
  };


  return (
    <Wrapper>
   <form className='form' onSubmit={handleSubmit}>
    <Logo/>
    <h4>Register</h4>
    <div style={{ marginBottom: '10px' }}>
          <label htmlFor="name">Username:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            className='form-input'
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            className='form-input'
            onChange={handleEmailChange}
            required
          />
           {emailError && <p style={{ color: 'red' }}>{emailError}</p>} {/* Display email error */}

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
          Signup
        </button>
    <p>Already a member?
      <Link to='/login' className='member-btn'>Login</Link>
    </p>
    </form>
    </Wrapper>
  )
}

export default Register;