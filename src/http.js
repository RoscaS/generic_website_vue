import Axios from "axios";

const axios = Axios.create({});
axios.defaults.baseURL = "http://localhost:8000/";
// axios.defaults.baseURL = "https://api.jrosk.ch/";

export default axios;
