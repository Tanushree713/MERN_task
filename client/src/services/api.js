import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api", // Backend API base URL
});

// Set Authorization token dynamically for each request
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`; // Correct syntax for Bearer token
  }
  return req;
});

// Login API call with username storage
export const login = async (data) => {
  const response = await API.post("/auth/login", data);
  // Store the username and token in localStorage upon successful login
  localStorage.setItem("token", response.data.token);
  localStorage.setItem("username", response.data.username);
  
  return response;
};

// Other API calls
export const createEmployee = (data) => API.post("/employees", data);
export const fetchEmployees = () => API.get("/employees");
export const deleteEmployee = (id) => API.delete(`/employees/${id}`);

export default API;