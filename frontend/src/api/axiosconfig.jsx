import axios from "axios";

const instance = axios.create({
    baseURL: "https://nexora-assignment-70go.onrender.com/api",
});

export default instance;
