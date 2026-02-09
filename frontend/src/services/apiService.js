import axios from "axios";

/**
 * @description Sends a long Url to the backend Api to be shortened.
 * @param {string} longUrl the Url that the user wants to shorten.
 * @returns {Promise<Object>} A promise that resolves to the data returned from the
 *          On success,this will be an object like: {success:true,data:{url}}
 */

export const createShortUrl = async (longUrl) => {
    try {
        const response = await axios.post('/api/shorten',{longUrl});
        return response.data;
    } catch (error) {
        console.error('API Error: Failed to create short Url',error);

        if(error.response && error.response.data){
            throw error.response.data;
        } else {
            throw new Error("An unexpected error occurred. Please try again.");
        }
    }
}