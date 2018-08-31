import Axios from "axios";

const axios = Axios.create({});
axios.defaults.baseURL = "http://localhost:8000/api/";

export default axios;
