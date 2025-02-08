import axios from 'axios';

export const getCustomeContacts = async (apiBase: string) => {
    try {
        const response = await axios.get(`${apiBase}/customers/`);
        return response.data;
    } catch (error: unknown) {
        console.error('Error while fetching contacts', error);
        return [];
    }
} 