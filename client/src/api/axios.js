import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true, // VERY IMPORTANT (cookies)
});

export default API;
