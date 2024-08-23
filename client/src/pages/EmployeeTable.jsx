import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import Wrapper from '../assets/wrappers/EmployeeTable';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const EmployeeTable = () => {

    const columns=[
        {
            name:'Unique Id',
            selector:row => row._id,
            sortable:true
        },
        {
            name:'Image',
            selector:row =>  <img src={`http://localhost:3333/${row.imagePath}`}  alt={row.name} height="50" /> ,
            sortable:true
        },
        {
            name:'Name',
            selector:row => row.name,
            sortable:true
        },
        {
            name:'Email',
            selector:row => row.email,
            sortable:true
        },
        {
            name:'Mobile',
            selector:row => row.mobile,
            sortable:true
        },
        {
            name:'Designation',
            selector:row => row.selectedRole,
            sortable:true
        },
        {
            name:'Gender',
            selector:row => row.gender,
            sortable:true
        },
        {
            name:'Course',
            selector: row => row.course,
            sortable:true
        },
        {
            name:'Create date',
            selector:row => row.createDate,
            sortable:true
        },
        
        {
          name: 'Action',
          cell: (row) => (
            <div>
              <button
                className='btn'
                onClick={() => navigate(`/dashboard/editemployee/${row._id}`)}
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(row._id)}
                style={{ padding: '5px 10px', backgroundColor: '#DC3545', color: '#fff', border: 'none', borderRadius: '4px' }}
              >
                Delete
              </button>
            </div>
          ),
        },


    ];

      
      const [length,setlength]=useState(0);
      const[data,setData]=useState([]);
      const [records,setrecords]=useState([]);


      
      
      useEffect(() => {
        axios.get('http://localhost:3333/employeesList')
          .then(response => {
            setData(response.data.employeesList);
            setrecords(response.data.employeesList)
            setlength(response.data.employeesList.length); 
          })
          .catch(error => {
            console.error("Error", error);
          });
      }, []);



      const navigate=useNavigate();
     
      // const handleDelete1 = (id) => {
      //   const rowid=row.id;
        
      //    setrecords(records.filter(row =>rowid !== id));
        
      // };
  

      const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3333/deleteEmployee/${id}`);
            
            // If the delete is successful, update the state to remove the deleted record
            
            
            toast.success('Employee deleted successfully');
        } catch (error) {
            console.error('Error deleting employee:', error);
            toast.error('Failed to delete employee');
        }
    };
     

      const handleFilter = (event) => {
        const value = event.target.value.toLowerCase();
        setrecords(
            data.filter(f => (f.name && f.name.toLowerCase().includes(value)))
        );
    }

    

  return (
    <Wrapper>
        <div className="table" style={{ height: '500px' }}>
          <div  style={{display:'flex',justifyContent:'flex-end'}}>

        <h5 >Total Count: {length}</h5>
        <div className='filter'>
            <input type='text' placeholder='Search by name'  onChange={handleFilter} />
        </div>
          </div>
        <DataTable columns={columns} data={records} selectableRows fixedHeader pagination>
            
        </DataTable>
        </div>
    </Wrapper>
  )
}

export default EmployeeTable;