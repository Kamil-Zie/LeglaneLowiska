import axiors from "axios";

export default axiors.create({
    baseURL: "http://localhost:6767/api",
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true
});