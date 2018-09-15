import settings from "./site-settings";

import Axios from "axios";

const axios = Axios.create({});
axios.defaults.baseURL = settings.url;

export default axios;
