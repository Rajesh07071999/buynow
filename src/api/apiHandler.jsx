import { axiosClient } from "./apiClinet";

export const registerUser = async (data) => {
    try {
        const response = await axiosClient.post(`${import.meta.env.VITE_BASE_URL}user/auth/register`, data);
        return response;
    } catch (error) {
        throw error;
    }
};

export const login = async (data) => {
    try {
        const response = await axiosClient.post(`${import.meta.env.VITE_BASE_URL}user/auth/login`, data.data);
        return response;
    } catch (error) {
        throw error;
    }
};

export const changePassword = async (data) => {
    try {
        const response = await axiosClient.post(`${import.meta.env.VITE_BASE_URL}user/auth/login`, data);
        return response;
    } catch (error) {
        throw error;
    }
};
export const userDetails = async (data) => {
    try {
        const response = await axiosClient.post(`${import.meta.env.VITE_BASE_URL}user/auth/userDetails`, data);
        return response;
    } catch (error) {
        throw error;
    }
};
export const editProfile = async (data) => {
    
    try {
        const response = await axiosClient.post(`${import.meta.env.VITE_BASE_URL}user/auth/editProfile`, data.editableUser);
        return response;
    } catch (error) {
        throw error;
    }
};

export const logout = async (data) => {
    try {
        const response = await axiosClient.post(`${import.meta.env.VITE_BASE_URL}user/auth/logout`, data);
        return response;
    } catch (error) {
        throw error;
    }
};


// Product

export const productListing = async (data) => {
    try {
        const response = await axiosClient.post(`${import.meta.env.VITE_BASE_URL}user/prodcuts/productListing`, data);
        return response;
    } catch (error) {
        throw error;
    }
};

export const addProductRating = async (data) => {
    try {
        const response = await axiosClient.post(`${import.meta.env.VITE_BASE_URL}user/prodcuts/addProductRating`, data);
        return response;
    } catch (error) {
        throw error;
    }
};

//cart
export const addToCart = async (data) => {
    try {
        const response = await axiosClient.post(`${import.meta.env.VITE_BASE_URL}user/cart/addtoCart`, data);
        return response;
    } catch (error) {
        throw error;
    }
};
export const cartListing = async (data) => {
    try {
        const response = await axiosClient.post(`${import.meta.env.VITE_BASE_URL}user/cart/cartLisitng`, data);
        return response;
    } catch (error) {
        throw error;
    }
};
export const removeCart = async (data) => {
    try {
        const response = await axiosClient.post(`${import.meta.env.VITE_BASE_URL}user/cart/removeCart`, data);
        return response;
    } catch (error) {
        throw error;
    }
};

//order
export const orderPlace = async (data) => {

    try {
        const response = await axiosClient.post(`${import.meta.env.VITE_BASE_URL}user/order/orderPlace`, data.payload);
        return response;
    } catch (error) {
        throw error;
    }
};


export const orderListing = async (data) => {
    try {
        const response = await axiosClient.post(`${import.meta.env.VITE_BASE_URL}user/order/orderListing`, data);
        return response;
    } catch (error) {
        throw error;
    }
};
export const cancelOrder = async (data) => {
    try {
        const response = await axiosClient.post(`${import.meta.env.VITE_BASE_URL}user/order/cancelOrder`, data);
        return response;
    } catch (error) {
        throw error;
    }
};