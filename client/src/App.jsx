import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom";
import {
  HomeLayout,
  Landing,
  Register,
  Login,
  DashboardLayout,
  Error,
  
} from './pages';
import Welcome from "./pages/Welcome";
// import AddEmployee from "./pages/AddEmployee";
import EmployeeList from "./pages/EmployeeList";
import CreateEmployee from "./pages/CreateEmployee";
import EditEmployee from "./pages/EditEmployeePage";

 export const checkDefaultTheme=()=>{
  const isDarkTheme=localStorage.getItem('darkTheme')==='true';
  document.body.classList.toggle('dark-theme',isDarkTheme);
  return isDarkTheme;
}

checkDefaultTheme();

function ProtectedRoute({children}){
  const tocken = localStorage.getItem('token');
  return tocken ? <div>{children}</div>:<Navigate replace to="/login" />
}

const router = createBrowserRouter([
  {
    path: '/',
    element: (
    <HomeLayout />
  ),
    errorElement: <Error />,
    children: [
      {
        index: true,
        element:  <Landing />
      
      },

      {
        path: 'register',
        element: <Register />
      },
      {
        path: 'login',
        element: <Login />
      },
      {
        path: 'test/:id',
        element: <EditEmployee />,
      },
      {
        path: 'dashboard',
        element: (
          <ProtectedRoute>
        <DashboardLayout />
        </ProtectedRoute>
      ),
        children: [
          {
            index:true,
            element:(
              <ProtectedRoute>
            <Welcome/>
            </ProtectedRoute>)
          },
          
          {
            path:'employeeList',
            element:(
              <ProtectedRoute>
            <EmployeeList/>
            </ProtectedRoute>
          )
          },
          {
            path:'createemployee',
            element:(
              <ProtectedRoute>
            <CreateEmployee/>
            </ProtectedRoute>
            )
          },
          {
            path:'editemployee/:id',
            element:<EditEmployee/>
          },
          
         
          
        ]
      },
      {
        path: 'error',
        element: <Error />
      }
    ]
  },

]);


const App = () => {
  return (
    <RouterProvider router={router} />
  );
};
export default App;
