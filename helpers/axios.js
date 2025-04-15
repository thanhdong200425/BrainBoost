import axios from 'axios';
import { BRAIN_BOOST_SERVER_URL } from '../config/remote-server';
import AsyncStorage from '@react-native-async-storage/async-storage';

const serverApi = axios.create({
    baseURL: BRAIN_BOOST_SERVER_URL,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
    timeout: 10000,
});

serverApi.interceptors.request.use(
    async (config) => {
        if (config.url?.includes('/auth/signin') || config.url?.includes('/auth/signup')) {
            return config;
        }

        const token = await AsyncStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default serverApi;
