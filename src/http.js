import Axios from "axios";

const axios = Axios.create({});
// axios.defaults.baseURL = "http://localhost:8000/";
// axios.defaults.baseURL = "http://jrosk.ch:8000/";
axios.defaults.baseURL = "http://api.jrosk.ch/";

export default axios;
