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
let deleteUser = (userId) => {
  return axios.delete("/api/delete-user", {
    data: {
      id: userId,
    },
  });
};
let EditUserService = (inputData) => {
  return axios.put("/api/edit-user", inputData);
};
export {
  handleLoginAPI,
  getAllUsers,
  createNewUserService,
  deleteUser,
  EditUserService,
};
