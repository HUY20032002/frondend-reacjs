import axios from "../axios" 
const handleLoginAPI = (userEmail,userPassword) =>{
return axios.post('/api/login',{email:userEmail,password:userPassword});
}
let getAllUsers = (inputId) => {
    return axios.get(`/api/get-all-users?id=${inputId}`);
};

export {
    handleLoginAPI,
    getAllUsers,
}
