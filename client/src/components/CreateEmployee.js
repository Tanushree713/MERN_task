import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createEmployee } from '../services/api';


const CreateEmployee = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    mobile: '',
    designation: '',
    gender: '',
    course: '',
    image: null,
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setForm({ ...form, image: e.target.files[0] });
  };
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  } ;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      formData.append(key, value);
    }); 
   
    try {
      await createEmployee(formData);
      setMessage('Employee created successfully!');
      navigate('/employee-list')
    } catch (err) {
      setMessage('Error creating employee.');
    }
  };

  return (
    <>
    <nav>
    <button onClick={() => navigate('/create-employee')}>Create Employee</button>
    <button onClick={() => navigate('/employee-list')}>View Employees</button>
    <button onClick={handleLogout}>Logout</button>
  </nav>
    <div className="create-employee">
      <h2>Create Employee</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="text" name="mobile" placeholder="Mobile" onChange={handleChange} required />
        <input type="text" name="designation" placeholder="Designation" onChange={handleChange} required />
        <select name="gender" onChange={handleChange} required>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <input type="text" name="course" placeholder="Course" onChange={handleChange} required />
        <input type="file" name="image" onChange={handleFileChange} required />
        <button type="submit">Create</button>
      </form>
      {message && <p>{message}</p>}
    </div>
    </>
  );
};

export default CreateEmployee;