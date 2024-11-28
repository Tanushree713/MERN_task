import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterBy, setFilterBy] = useState("name");
  const navigate = useNavigate();

  // Fetch employees from API
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await API.get("/employees");
        setEmployees(response.data);
        setFilteredEmployees(response.data); // Initially set filtered employees to all
      } catch (err) {
        console.error("Failed to fetch employees:", err);
      }
    };

    fetchEmployees();
  }, []);

  // Handle delete
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      try {
        await API.delete(`/employees/${id}`);
        const updatedEmployees = employees.filter((employee) => employee._id !== id);
        setEmployees(updatedEmployees);
        setFilteredEmployees(updatedEmployees);
        alert("Employee deleted successfully!");
      } catch (err) {
        console.error("Failed to delete employee:", err);
        alert("Failed to delete employee!");
      }
    }
  };

  // Handle search
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);

    const filtered = employees.filter((employee) => {
      const searchValue = e.target.value.toLowerCase();
      const fieldToFilter = filterBy.toLowerCase();
      return employee[fieldToFilter]?.toLowerCase().includes(searchValue);
    });

    setFilteredEmployees(filtered);
  };
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  }
  // Handle filter change
  const handleFilterChange = (e) => {
    setFilterBy(e.target.value);
    // Reapply the search term with the new filter
    const filtered = employees.filter((employee) => {
      const searchValue = searchTerm.toLowerCase();
      const fieldToFilter = e.target.value.toLowerCase();
      return employee[fieldToFilter]?.toLowerCase().includes(searchValue);
    });

    setFilteredEmployees(filtered);
  };

  return (
    <>
    <nav>
    <button onClick={() => navigate('/create-employee')}>Create Employee</button>
    <button onClick={() => navigate('/employee-list')}>View Employees</button>
    <button onClick={handleLogout}>Logout</button>
  </nav>

    <div className="employee-list">
      <h2>Employee List</h2>
      <div className="controls">
        <div className="stats">
          <strong>Total Employees: {filteredEmployees.length}</strong>
        </div>
        <div className="search-filter">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder={`Search by ${filterBy}`}
          />
          <select value={filterBy} onChange={handleFilterChange}>
            <option value="name">Name</option>
            <option value="email">Email</option>
      
          </select>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Designation</th>
            <th>Gender</th>
            <th>Course</th>
            <th>Created Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.map((employee) => (
            <tr key={employee._id}>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.mobile}</td>
              <td>{employee.designation}</td>
              <td>{employee.gender}</td>
              <td>{employee.course}</td>
              <td>{new Date(employee.createdAt).toLocaleDateString()}</td>
              <td>
                <button id="editBtn" onClick={() => navigate(`/edit/${employee._id}`)}>Edit</button>
                <button id="deleteBtn" onClick={() => handleDelete(employee._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  );
};

export default EmployeeList;