import axiors from "axios";

export default axiors.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true
});