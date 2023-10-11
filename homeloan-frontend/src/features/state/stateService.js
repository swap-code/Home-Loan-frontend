import axios from "axios";

const API_URL = "/api/Static";

const config = (token) => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});



//Login User
const getStates = async (countryId) => {
    const response = await axios.get(`${API_URL}/country/${countryId}/state`);
    return response.data;
  };
const getState = async (stateId) => {
    const response = await axios.get(`${API_URL}/state/${stateId}`);
    return response.data;
  };
  const createState = async (countryId,state, token) => {
    const response = await axios.post(`${API_URL}/country/${countryId}/state`, state, config(token));
    return response.data;
  };
  
  const deleteState = async (stateId, token) => {
    const response = await axios.delete(`${API_URL}/state/${stateId}`, config(token));
    return response.data;
  };
  const editState = async (stateId, state, token) => {
    const response = await axios.put(`${API_URL}/state/${stateId}`, state, config(token));
    return response.data;
  };

  const stateService={
    getStates,
    getState,
    createState,
    deleteState,
    editState
  }

  export default stateService;