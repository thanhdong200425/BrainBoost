import axios from 'axios';
import serverApi from '../helpers/axios';

export const getHomeData = async () => {
    try {
        const response = await serverApi.get('/api/home');
        return response.data.data;
    } catch (error) {
        console.error('Error fetching home data:', error);
        throw error;
    }
};
