import axios from "axios";
const API_URL = "/api/Loan";
const config = (token) => ({
    headers: {
        Authorization: `Bearer ${token}`,
    },
});

const getLoans = async (token) => {
    const response = await axios.get(API_URL, config(token));
    return response.data;
};
const getLoan = async (id, token) => {
    const response = await axios.get(API_URL + "/" + id, config(token));
    return response.data;
};

const getAdminLoans=async (token) => {
    const response = await axios.get(`${API_URL}/get-all`,config(token));
    return response.data;
};

const createLoan = async (loan, token) => {
    const response = await axios.post(API_URL, loan, config(token));
    return response.data;
};
const getCollaterals=async(loanId,token)=>{
    const response = await axios.get(`${API_URL}/${loanId}/collateral`,config(token));
    console.log(response.data);
    return response.data;
}
const updateLoanState=async(loanId,state,token)=>{
    const response = await axios.post(`${API_URL}/${loanId}/state`,state,config(token));
    return response.data;
}
const addCollateral=async(loanId,collateral,token)=>{
    const response = await axios.post(`${API_URL}/${loanId}/collateral`,collateral,config(token));
    return response.data;
}
const removeCollateral=async(loanId,collateralId,token)=>{
    const response = await axios.post(`${API_URL}/${loanId}/collateral/${collateralId}`,config(token));
    return response.data;
}
const deleteLoan = async (id, token) => {
    const response = await axios.delete(`${API_URL}/?id=${id}`, config(token));
    return response.data;
};
const editLoan = async (id, loan, token) => {
    const response = await axios.patch(`${API_URL}/${id}`, loan, config(token));
    return response.data;
};
const applyLoan = async (id, token) => {
    const response = await axios.post(`${API_URL}/${id}`, {}, config(token));
    return response.data;
}

const loanService = {
    getLoans,
    getLoan,
    getCollaterals,
    addCollateral,
    removeCollateral,
    updateLoanState,
    getAdminLoans,
    createLoan,
    applyLoan,
    deleteLoan,
    editLoan,
};

export default loanService;