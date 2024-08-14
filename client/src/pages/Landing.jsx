import React from 'react';
import Wrapper from '../assets/wrappers/LandingPage';
import main from '../assets/images/main.svg';
import { Link } from 'react-router-dom';
import { Logo } from '../components';



function Landing() {


  return (
    <Wrapper>
     <nav>
      <Logo/>
     </nav>

      <div className="container page">
        <div className="info">
          <h2>Welcome to <span>Employee Management System</span></h2>
          <p>
          Efficiently manage your workforce with powerful 
          tools designed to streamline HR tasks and enhance productivity!
          </p>

          {/* <Link to='/register' className='btn register-link'>
          Register
          </Link> */}

          <Link to='/login' className='btn'>
          Login 
          </Link>


        </div>
        <img src={main} alt='job hunt' className='img main-img'/>

      </div>
    </Wrapper>
  )
}



export default Landing;