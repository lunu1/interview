import React from 'react'
import { Link } from 'react-router-dom';
import Wrapper from '../assets/wrappers/Welcome.js';



const Welcome = () => {
  return (
    <Wrapper>
        <div className="welcome">
        <h2>Welcome to Admin Panel</h2>
        {/* <Link to='addemployee' className='btn'>Create Employee</Link> */}
        </div>
    </Wrapper>
  )
}

export default Welcome;