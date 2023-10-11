import axios from "axios";

const API_URL = "/api/Static/country";
const config = (token) => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});


//Login User
const getCountries = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};
const createCountry = async (country, token) => {
  const response = await axios.post(API_URL, country, config(token));
  return response.data;
};

const deleteCountry = async (id, token) => {
  const response = await axios.delete(`${API_URL}/${id}`, config(token));
  return response.data;
};
const editCountry = async (id, country, token) => {
  const response = await axios.put(`${API_URL}/${id}`, country, config(token));
  return response.data;
};


const countryService = {
  getCountries,
   createCountry,
   deleteCountry,
   editCountry
}

export default countryService;