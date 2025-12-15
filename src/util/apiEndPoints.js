export const BASE_URL = "https://mudrika-vyavastha-backend.onrender.com/api/v1.0";

const CLOUDINARY_CLOUD_NAME = "dqqdt4i6q"

export const API_ENDPOINTS = {
    LOGIN: "/login",
    REGISTER: "/register",
    GET_ALL_CATEGORIES:"/categories",
    UPLOAD_IMAGE: `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
    ADD_CATEGORY:"/categories",
    UPDATE_CATEGORY:(categoryId)=>`/categories/${categoryId}`
}