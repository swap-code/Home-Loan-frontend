import axios from "axios";

const API_URL = "/api/Promotion";
const config = (token) => ({
  headers: {
      Authorization: `Bearer ${token}`,
  },
});

const getPromotion = async () => {
    const response = await axios.get(API_URL);
    return response.data;
  };

  const createPromotion = async (promotion,token) => {
  const response = await axios.post(API_URL, promotion,config(token));
  return response.data;
  }

  const promotionService={
   getPromotion,
   createPromotion
  }

  export default promotionService;