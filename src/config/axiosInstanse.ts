import axios from "axios";

const Axiosinstance = axios.create({
  baseURL: "http://localhost:3000",
});

export default Axiosinstance;
