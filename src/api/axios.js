import axiors from "axios";

export default axiors.create({
    baseURL: "http://localhost:3000/api",
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true
});