import axios from "axios";

const API_URL = "/api/Static";

const config = (token) => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});


//Login User
const getCities = async (stateId) => {
    const response = await axios.get(`${API_URL}/state/${stateId}/city`);
    return response.data;
  };

  const getCity = async (cityId) => {
    const response = await axios.get(`${API_URL}/city/${cityId}`);
    return response.data;
  };
  const createCity = async (stateId,city, token) => {
    const response = await axios.post(`${API_URL}/state/${stateId}/city`, city, config(token));
    return response.data;
  };
  
  const deleteCity = async (cityId, token) => {
    const response = await axios.delete(`${API_URL}/city/${cityId}`, config(token));
    return response.data;
  };
  const editCity = async (cityId, city, token) => {
    const response = await axios.put(`${API_URL}/city/${cityId}`, city, config(token));
    return response.data;
  };

  const cityService={
    getCities,
    createCity,
    deleteCity,
    editCity,
    getCity
  }

  export default cityService;