import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Wrapper from '../assets/wrappers/CreateEmployee';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function CreateEmployee() {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [mobile, setMobile] = useState('');
    const [errorimage, setErrorimage] = useState(null);
    const [selectedRole, setSelectedRole] = useState('');
    const [gender, setSelectedGender] = useState('');
    const [course, setSelectedDegrees] = useState([]);
    const [file, setFile] = useState(null);
    const [error, setError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [Mobileerror, Mobileseterror] = useState('');
    
    const mobileRegex = /^[0-9]{10}$/; // Adjust the pattern according to your requirements
    const navigate = useNavigate();
    
    const validateMobile = (value) => {
      if (mobileRegex.test(value)) {
        Mobileseterror('');
      } else {
        Mobileseterror('Invalid mobile number. Must be 10 digits.');
      }
  };

  const handleChangeMobile = (e) => {
      const { value } = e.target;
      setMobile(value);
      validateMobile(value);
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    
    if (selectedFile) {
      const fileType = selectedFile.type;

      if (fileType !== 'image/jpeg' && fileType !== 'image/png') {
        setError('Please upload a JPG or PNG image.');
        setFile(null); // Reset file state
      } else {
        setError('');
        setFile(selectedFile);
      }
    }
  };

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

  // const handleSubmitimage = (event) => {
  //   event.preventDefault();
  //   if (file) {
  //     // Handle file upload
  //     console.log('File to upload:', file);
  //     // You can use FormData and axios or fetch to upload the file to the server
  //   } else {
  //     setError('Please select a file.');
  //   }
  // };

    const handleChangeDegree = (event) => {
      const value = event.target.value;
      setSelectedDegrees(prevState =>
        prevState.includes(value)
          ? prevState.filter(degree => degree !== value)
          : [...prevState, value]
      );
    }

  const handleChangeGender = (event) => {
    setSelectedGender(event.target.value);
  };
    

    const handleChange = (event) => {
        setSelectedRole(event.target.value);
    };


    // const handleSubmit = async (e) => {
    //     e.preventDefault();

    //     if (course.length === 0) {
    //       setError('Please select at least one degree.');
    //       return;
    //     }

    //     try {
    //         const response = await axios.post('http://localhost:3333/newEemployee', {
    //             name,
    //             email,
    //             mobile,
    //             gender,
    //             selectedRole,
    //             course
    //         });



    //         toast.success('Create Employee Successful');
    //         navigate('/dashboard/employeeList');

    //     } catch (err) {
    //         setError(err.response?.data?.message || 'Create Employee Failed');
    //     }
    // };

    // const handleSubmit = async (e) => {
    //   e.preventDefault();
    
    //   if (course.length === 0) {
    //     setError('Please select at least one degree.');
    //     return;
    //   }
    
    //   // Create a new FormData object
    //   const formData = new FormData();
    //   formData.append('name', name);
    //   formData.append('email', email);
    //   formData.append('mobile', mobile);
    //   formData.append('gender', gender);
    //   formData.append('selectedRole', selectedRole);
    //   formData.append('course', course);
    //   formData.append('image', file); // Append the selected file
    
    //   try {
    //     const response = await axios.post('http://localhost:3333/newEemployee', formData, {
    //       headers: {
    //         'Content-Type': 'multipart/form-data',
    //       },
    //     });
    
    //     toast.success('Create Employee Successful');
    //     navigate('/dashboard/employeeList');
    
    //   } catch (err) {
    //     setError(err.response?.data?.message || 'Create Employee Failed');
    //   }
    // };


    const handleSubmit = async (e) => {
      e.preventDefault();
  
      if (course.length === 0) {
          setError('Please select at least one degree.');
          return;
      }
  
      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      formData.append('mobile', mobile);
      formData.append('gender', gender);
      formData.append('selectedRole', selectedRole);
      for (let i = 0; i < course?.length; i++) {
        formData.append(`course[]`, course[i]);
      } 
      formData.append('image', file);
  
      try {
          const response = await axios.post('http://localhost:3333/newEemployee', formData, {
              headers: {
                  'Content-Type': 'multipart/form-data',
              },
          });
  
          toast.success('Create Employee Successful');
          navigate('/dashboard/employeeList');
  
      } catch (err) {
          setError(err.response?.data?.message || 'Create Employee Failed');
      }
  };
  
    

    return (
        <Wrapper>
            <form className='form' onSubmit={handleSubmit}>

                <h4>Add Employee</h4>
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
                    <label htmlFor="mobile">Mobile Number:</label>
                    <input
                        type="text"
                        id="mobile"
                        name="mobile"
                        value={mobile}
                        onChange={handleChangeMobile}
                        className='form-input'
                        required
                    />
                     {Mobileerror && <p style={{ color: 'red' }} className="error-text">{Mobileerror}</p>}
                </div>
               
                <div style={{ margin: '20px' }}>
                    <label htmlFor="role" style={{ marginRight: '10px' }}>Select Role:</label>
                    <select
                        id="role"
                        value={selectedRole}
                        onChange={handleChange}
                        style={{ padding: '8px'  }}
                        required
                    >
                        <option value="" disabled>Select a role</option>
                        <option value="HR">HR</option>
                        <option value="Manager">Manager</option>
                        <option value="Sales">Sales</option>
                    </select>
                    {selectedRole && <p>Selected Role: {selectedRole}</p>}
                </div>

                <div style={{ margin: '20px' }}>

                    <div className="formin">

     
        <legend style={{ marginBottom: '10px' }}>Select Gender:</legend>
        <div style={{ marginBottom: '10px' }}>
          <label>
            <input
              type="radio"
              name="gender"
              value="male"
              checked={gender === 'male'}
              onChange={handleChangeGender}
              style={{ marginRight: '8px' }}
              required
              />
            Male
          </label>
        </div>
        <div>
          <label>
            <input
              type="radio"
              name="gender"
              value="female"
              checked={gender === 'female'}
              onChange={handleChangeGender}
              style={{ marginRight: '8px' }}
              required
            />
            Female
          </label>
          {gender && <p>Selected Gender: {gender}</p>}
        </div>
        
        <div style={{ margin: '20px' }}>
      
        <legend style={{ marginBottom: '10px' }}>Select Degrees:</legend>
        <div style={{ marginBottom: '10px' }}>
          <label>
            <input
              type="checkbox"
              value="MCA"
              checked={course.includes('MCA')}
              onChange={handleChangeDegree}
              style={{ marginRight: '8px' }}
              
              />
            MCA
          </label>
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>
            <input
              type="checkbox"
              value="BCA"
              checked={course.includes('BCA')}
              onChange={handleChangeDegree}
              style={{ marginRight: '8px' }}
              
              />
            BCA
          </label>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              value="BSC"
              checked={course.includes('BSC')}
              onChange={handleChangeDegree}
              style={{ marginRight: '8px' }}
              
              />
            BSC
          </label>
        </div>
        {course.length > 0 && (
            <p>Selected Degrees: {course.join(', ')}</p>
        )}
    </div>
    </div>

      
    </div>
    <div style={{ marginBottom: '10px' }}>
          <label htmlFor="file-upload">Upload Image (JPG or PNG only):</label>
          <input
            type="file"
            id="file-upload"
            // accept=".jpg,  .png"
            onChange={handleFileChange}
            style={{ marginTop: '10px' }}
          />
        </div>
        
        {errorimage && <p style={{ color: 'red' }}>{errorimage}</p>}
        
        {file && (
          <div>
            <p>Selected file: {file.name}</p>
            <img
              src={URL.createObjectURL(file)}
              alt="Preview"
              style={{ width: '200px', height: 'auto', marginTop: '10px' }}
            />
          </div>
        )}

                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button type="submit" className='btn btn-block'>
                    Create Employee
                </button>
                
            </form>
        </Wrapper>
    )
}

export default CreateEmployee;