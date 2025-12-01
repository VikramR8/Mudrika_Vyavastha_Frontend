import axios from "axios";
import { BASE_URL } from "./apiEndPoints";


const axiosConfig = axios.create({
    baseURL: BASE_URL,
    headers : {
        "Content-Type": "application/json",
        Accept:"application/json"
    }
});

const excludeEndPoints = ["/login", "/register", "/status", "/activate", "/health"];


//Request Interceptors
axiosConfig.interceptors.request.use((config)=>{
    const shouldSkipToken = excludeEndPoints.some((endpoint)=>{
        config.url?.includes(endpoint)
    })

    if(!shouldSkipToken) {
        const accessToken = localStorage.getItem("token");
        if(accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
    }

    return config
}, (error)=>{
    return Promise.reject(error)
})

//Response Interceptors
axiosConfig.interceptors.response.use((response)=>{
    return response;
}, (error)=>{
    if (error.response) {
        if(error.response.status === 401){
            window.location.href = "/login"
        }
        else if(error.response.status === 500){
            console.log("Server error. Please try again later!")
        }
    } else if(error.code === "ECONNABORTED") {
        console.log("Request timeout. Please")
    }
    return Promise.reject(error)
})

export default axiosConfig;