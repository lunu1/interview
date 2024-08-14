import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Wrapper from '../assets/wrappers/CreateEmployee';
import axios from 'axios';
import { toast } from 'react-toastify';

function EditEmployee() {
  const { id } = useParams(); // Get the employee ID from the URL
  const navigate = useNavigate();
  
  // State for form fields
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [gender, setSelectedGender] = useState('');
  const [course, setSelectedDegrees] = useState([]);
  const [file, setFile] = useState(null);
  const [errorimage, setErrorimage] = useState(null);
  const [error, setError] = useState('');
  const [emailError,setEmailError]=useState('');
  const [MobileError,Mobileseterror]=useState('');
  const [filteredData1,setfilteredData1]=useState([]);

  const [mainData,setMainData] = useState()

  const mobileRegex = /^[0-9]{10}$/;

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

useEffect(() => {
  axios.get('http://localhost:3333/employeesList')
    .then(response => {
      const filteredData = response.data.employeesList?.filter(item => item?._id == id)
      setfilteredData1(filteredData)
    })
    .catch(error => {
      console.error("Error", error);
    });
}, []);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      const fileType = selectedFile.type;

      if (fileType !== 'image/jpeg' && fileType !== 'image/png') {
        setErrorimage('Please upload a JPEG or PNG image.');
        setFile(null); // Reset file state
      } else {
        setErrorimage('');
        setFile(selectedFile);
      }
    }
  };

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

  const handleSubmit1 = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', filteredData1[0]?.name);
      formData.append('email', filteredData1[0]?.email);
      formData.append('mobile', filteredData1[0]?.mobile);
      formData.append('selectedRole', filteredData1[0]?.designation);
      formData.append('gender', filteredData1[0]?.gender);
      formData.append('course', filteredData1[0]?.course);
     
      // if (file && file.name !== file.url) {
      //   formData.append('image', file);
      // }

      await axios.put(`http://localhost:3333/updateEmployee/${id}`, formData);
      
      console.log(mainData);
      toast.success('Employee updated successfully');
      navigate('/dashboard/employeeList');

    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update employee');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
   try {
        await axios.put(`http://localhost:3333/updateEmployee/${id}`, {
            name : name!= ''?name:filteredData1[0]?.name,
            email : email!= ''?email:filteredData1[0]?.email,
            mobile : mobile!= ''?mobile:filteredData1[0]?.mobile,
            gender : gender!= ''?gender:filteredData1[0]?.gender,
            selectedRole : selectedRole!= ''?selectedRole:filteredData1[0]?.selectedRole,
            course : course!= ''?course:filteredData1[0]?.course,
        });

        toast.success('Employee updated successfully');
        navigate('/dashboard/employeeList');

    } catch (err) {
        setError(err.response?.data?.message || 'Failed to update employee');
    }
};

  

  return (
    <Wrapper>
      <form className='form' onSubmit={handleSubmit}>
        <h4>Edit Employee</h4>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="name">Username:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={filteredData1[0]?.name}
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
            value={filteredData1[0]?.email}
            className='form-input'
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="mobile">Mobile Number:</label>
          <input
            type="text"
            id="mobile"
            name="mobile"
            value={filteredData1[0]?.mobile}
            onChange={(e) => setMobile(e.target.value)}
            className='form-input'
            required
          />
        </div>

        <div style={{ margin: '20px' }}>
          <label htmlFor="role" style={{ marginRight: '10px' }}>Select Role:</label>
          <select
            id="role"
            value={filteredData1[0]?.designation}
            onChange={(e) => setSelectedRole(e.target.value)}
            style={{ padding: '8px' }}
          >
            <option value="" disabled>Select a role</option>
            <option value="HR">HR</option>
            <option value="Manager">Manager</option>
            <option value="Sales">Sales</option>
          </select>
          {selectedRole && <p>Selected Role: {selectedRole}</p>}
        </div>

        <div style={{ margin: '20px' }}>
          <legend style={{ marginBottom: '10px' }}>Select Gender:</legend>
          <div style={{ marginBottom: '10px' }}>
            <label>
              <input
                type="radio"
                name="gender"
                value="male"
                checked={gender === 'male'}
                onChange={(e) => setSelectedGender(e.target.value)}
                style={{ marginRight: '8px' }}
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
                onChange={(e) => setSelectedGender(e.target.value)}
                style={{ marginRight: '8px' }}
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
                  onChange={(e) => setSelectedDegrees(e.target.value)}
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
                  onChange={(e) => setSelectedDegrees(e.target.value)}
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
                  onChange={(e) => setSelectedDegrees(e.target.value)}
                  style={{ marginRight: '8px' }}
                />
                BSC
              </label>
            </div>
            {course.length > 0 && (
              <p>Selected Degrees: {course}</p>
            )}
          </div>
        </div>

        {/* <div style={{ marginBottom: '10px' }}>
          <label htmlFor="file-upload">Upload Image (JPG or PNG only):</label>
          <input
            type="file"
            id="file-upload"
            accept=".jpg, .png"
            onChange={handleFileChange}
            style={{ marginTop: '10px' }}
          />
          {errorimage && <p style={{ color: 'red' }}>{errorimage}</p>}
          {file && file.url && (
            <div>
              <p>Current Image: {file.name}</p>
              <img
                src={file.url}
                alt="Current Image"
                style={{ width: '200px', height: 'auto', marginTop: '10px' }}
              />
            </div>
          )}
          {file && !file.url && (
            <div>
              <p>Selected file: {file.name}</p>
              <img
                src={URL.createObjectURL(file)}
                alt="Preview"
                style={{ width: '200px', height: 'auto', marginTop: '10px' }}
              />
            </div>
          )}
        </div> */}

        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit" className='btn btn-block'>
          Update Employee
        </button>
      </form>
    </Wrapper>
  );
}

export default EditEmployee;
