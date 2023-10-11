import axios from "axios";

const API_URL = "/api/Auth";

const config = (token) => ({
  headers: {
      Authorization: `Bearer ${token}`,
  },
});

//Login User
const login = async (userData) => {
    const response = await axios.post(API_URL + "/signin", userData);
  
    if (response.data) {
      localStorage.setItem("token", response.data.token);
    }
    return response.data;
  };
  
  //logout user
  const logout = () => {
    localStorage.removeItem("token");
  };

  const resetPassword = async(userData,token) => {
    const response = await axios.put(`${API_URL}`, userData,config(token));
    return response.data;
  }
  
  //signup user
  const signup = async (userData,token) => {
    const response = await axios.post(`${API_URL}/signup`, userData);
    return response.data;
  };
  
  //exported Function
  const authService = {
    login,
    logout,
    resetPassword,
    signup
  };
  export default authService;