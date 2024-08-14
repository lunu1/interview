import React from 'react';
import Wrapper from '../assets/wrappers/Navbar';
import { FaAlignLeft } from "react-icons/fa";
import Logo from './Logo';
import { useDashboardContext } from '../pages/DashboardLayout';
import LogoutContainer from './LogoutContainer';
import { ThemeProvider } from 'styled-components';
import ThemeToggle from './ThemeToggle';
import { Link } from 'react-router-dom';

function Navbar() {
    const { toggleSideBar } = useDashboardContext();
    return (
        <Wrapper>
            <div className="nav-center">

                {/* <button type='button' className="toggle-btn" onClick={toggleSideBar}>
                    <FaAlignLeft />
                </button> */}

                <div>
                    <Logo />
                    <h4 className='logo-text'>dashboard</h4>
                </div>
                <div className='Home'>
                    <Link to='/dashboard' className='btn'>
                        Home
                    </Link>
                    <Link to='employeeList' className='btn'>
                        Employee List
                    </Link>
                </div>

                <div className='btn-container'>
                    <ThemeToggle />
                    <LogoutContainer />
                </div>

            </div>
        </Wrapper>
    )
}

export default Navbar;