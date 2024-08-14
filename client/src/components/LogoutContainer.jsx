import React, { useEffect, useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import Wrapper from '../assets/wrappers/LogoutContainer';
import { useNavigate } from 'react-router-dom';

const LogoutContainer=()=> {
    const [username, setUsername] = useState('');
    const navigate=useNavigate();
      useEffect(() => {
      const storedUser = localStorage.getItem('username');
      if (storedUser) {
        setUsername(storedUser);
      }
    }, []);

    const handelelogout=()=>{
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      navigate('/login');
    }


  return (
    <Wrapper>
      <div className='btn-container'>
        <button type='button' className="btn logout-btn" >
            <FaUserCircle/>
            {username}
        </button>
        <button type='button' className='btn' onClick={handelelogout}>logout</button>
    </div>
    </Wrapper>
  )
}

export default LogoutContainer;