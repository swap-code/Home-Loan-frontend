import axios from "axios";
const API_URL = "/api/collateral";
const config = (token) => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

const getCollaterals = async (token) => {
  const response = await axios.get(API_URL, config(token));
  return response.data;
};
const getCollateral = async (id, token) => {
  const response = await axios.get(API_URL + "/" + id, config(token));
  return response.data;
};
const createCollateral = async (collateral, token) => {
  const response = await axios.post(API_URL, collateral, config(token));
  return response.data;
};
const deleteCollateral = async (id, token) => {
  const response = await axios.delete(`${API_URL}/?id=${id}`, config(token));
  return response.data;
};
const editCollateral = async (id, collateral, token) => {
  const response = await axios.put(`${API_URL}/?id=${id}`, collateral, config(token));
  return response.data;
};


const collateralService = {
  getCollaterals,
  getCollateral,
  createCollateral,
  deleteCollateral,
  editCollateral,
};

export default collateralService;