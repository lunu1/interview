import React, { createContext, useContext, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import Wrapper from '../assets/wrappers/Dashboard';
import { Navbar } from '../components';
import { checkDefaultTheme } from '../App';

const DashboardContext = createContext();



function DashboardLayout() {

const user={name:"lunu"};
const [showSidebar,setshowSidebar]=useState(false);
const[isDarkTheme,setisDarkTheme]=useState(checkDefaultTheme());

const toggleDarkTheme = () =>{
   const newDarkTheme=!isDarkTheme;
   setisDarkTheme(newDarkTheme);
   localStorage.setItem('darkTheme',newDarkTheme);
};

const toggleSideBar=()=>{
  setshowSidebar(!showSidebar);
};

const logoutUser = async () => {
  console.log('logout user');
};


  return (
    <DashboardContext.Provider
    value={{
      user,
      showSidebar,
      isDarkTheme,
      toggleDarkTheme,
      toggleSideBar,
      logoutUser
    }}>

    <Wrapper>
      <main className="dashboard">
        {/* <SmallSideBar /> */}
        {/* <BigSideBar /> */}
        <div>
          <Navbar/>
            <div className='dashboard-page'>
              
              
              <Outlet />

            </div>
          
        </div>
      </main>
    </Wrapper>
    </DashboardContext.Provider>


  )
}

export const useDashboardContext=()=>useContext(DashboardContext);

export default DashboardLayout;
