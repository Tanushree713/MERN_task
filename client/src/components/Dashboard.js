import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState , useEffect } from 'react';

const Dashboard = () => {
 
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the username from localStorage or make an API call
    const storedUser = localStorage.getItem("username");
    if (storedUser) {
      setUsername(storedUser.replace(/^"|"$/g, ""));
    } else {
      // Optional: Redirect to login if username is not found
      navigate("/");
    }
  }, [navigate]);


  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    navigate('/');
  };
  const userNewName = username.split(" ");
  const userName = userNewName[0] ;
  return (
    <div className="dashboard">
    <div>
      <nav>
        <button onClick={() => navigate('/create-employee')}>Create Employee</button>
        <button onClick={() => navigate('/employee-list')}>View Employees</button>
        <button onClick={handleLogout}>Logout</button>
      </nav>
      </div>
    
      <div>
      <h1>!! Welcome To {userName || "Admin"}'s Dashboard !!</h1>
      </div>  

    </div>
  );
};

export default Dashboard;