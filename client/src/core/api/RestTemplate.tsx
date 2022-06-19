import axios from "axios";

const BASE_API = "http://localhost:8080/api";

export const RestTemplate = axios.create({
    baseURL: BASE_API,
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
        "Content-Type": "application/json",
    }
})
