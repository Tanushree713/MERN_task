import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import Dashboard from './components/Dashboard';
import CreateEmployee from './components/CreateEmployee';
import EmployeeList from './components/EmployeeList';
import EditEmployee from './components/EditEmployeePage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-employee" element={<CreateEmployee />} />
        <Route path="/employee-list" element={<EmployeeList />} />
        <Route path="/edit/:id" element={<EditEmployee />} />
      </Routes>
    </Router>
  );
};

export default App;
