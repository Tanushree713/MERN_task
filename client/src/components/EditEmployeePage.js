import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";


const EditEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    designation: "",
    gender: "",
    course: "",
    image: null,
  });

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await API.get(`/employees/${id}`);
        setForm({
          ...response.data,
          image: null, // Reset image field for new upload
        });
      } catch (err) {
        console.error("Failed to fetch employee data:", err);
      }
    };

    fetchEmployee();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setForm({ ...form, image: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (value !== null) {
        formData.append(key, value);
      }
    }
);
    try {
      await API.put(`/employees/${id}`, formData);
      alert("Employee updated successfully!");
      navigate("/employee-list");
    } catch (err) {
      console.error("Failed to update employee:", err);
      alert("Failed to update employee!");
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
      <h2>Edit Employee</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
          required
        />
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <input
          type="tel"
          name="mobile"
          value={form.mobile}
          onChange={handleChange}
          placeholder="Mobile"
          required
        />
        <input
          type="text"
          name="designation"
          value={form.designation}
          onChange={handleChange}
          placeholder="Designation"
          required
        />
        <select
          name="gender"
          value={form.gender}
          onChange={handleChange}
          required
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        <input
          type="text"
          name="course"
          value={form.course}
          onChange={handleChange}
          placeholder="Course"
          required
        />
        <input type="file" name="image" onChange={handleChange} />
        <button type="submit">Update Employee</button>
      </form>
    </div>
    </>
  );
};

export default EditEmployee;