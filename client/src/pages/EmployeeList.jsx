import React from 'react';
import Wrapper from '../assets/wrappers/EmployeeList';
import EmployeeaTable from './EmployeeTable';
import { Link } from 'react-router-dom';
const EmployeeList = () => {
  return (
    <Wrapper>
      <div className='createbtn'>
        <Link to='/dashboard/createemployee' className='btn'>
          Create Employee
        </Link>

      </div>
      <EmployeeaTable />
    </Wrapper>
  )
}

export default EmployeeList;