import React from 'react'
import { Link, useRouteError } from 'react-router-dom';
import img from '../assets/images/not-found.svg';
import Wrapper from '../assets/wrappers/ErrorPage';

const Error = ()=>{
  const error=useRouteError();

  if(error.status===404){
    return <Wrapper>
      <div>
        <img src={img} alt='nt-found'/>
        <h3>Ohhh! Page Not Found</h3>
        <p>we can't seem to find the page you are looking for</p>
        <Link to='/dashboard'>back home</Link>
      </div>
    </Wrapper>
  }
  console.log(error);
  return (
    <Wrapper>
      <div>Something Went Wrong</div>
    </Wrapper>
  )
}

export default Error;