import axios from "../axios";
const handleLoginAPI = (userEmail, userPassword) => {
  return axios.post("/api/login", { email: userEmail, password: userPassword });
};
let getAllUsers = (inputId) => {
  return axios.get(`/api/get-all-users?id=${inputId}`);
};
const createNewUserService = (data) => {
  console.log("mess data", data);
  return axios.post("/api/create-new-user", data);
};
export { handleLoginAPI, getAllUsers, createNewUserService };
