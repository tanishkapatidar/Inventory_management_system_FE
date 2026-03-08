import axios from "axios";

const REST_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const listProducts = async () => {
    try{
        const response = await axios.get(REST_API_BASE_URL);
        return response.data;
    }
    catch(error){
        console.error("Error in listProducts:", error);
        throw error;
    }    
}

export const createProduct = async(product) => {

    try{
        const response =await axios.post(REST_API_BASE_URL, product)
        return response.data;
    }
    catch(error){

        console.error("Error in sending data to backend:", error);
        throw error;
    }      
}

export const getProductById = async (id) => {
    
    try{
        const response = await axios.get(`${REST_API_BASE_URL}/${id}`);
        return response.data;
    }
    catch(error){
        console.error("Error in fetch data from backend:", error);
        throw error;
    }
}

export const updateProduct = async (id,product) =>{
    try{
        const response = await axios.put(`${REST_API_BASE_URL}/${id}`, product);
        return response.data;
    }
    catch(error){
        console.error("Error in saving data in backend:", error);
        throw error;
    }
}

export const deleteProduct = async (id) =>{
    try{
        const response = await axios.delete(`${REST_API_BASE_URL}/${id}`);
        return response.data;
    }
    catch(error){
        console.error("Error in deleting data from backend:", error);
        throw error;
    }
}

