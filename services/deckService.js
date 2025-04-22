import serverApi from '../helpers/axios';

export const getAllDecks = async () => {
    try {
        const response = await serverApi.get('/api/decks');
        return response.data.data;
    } catch (error) {
        console.error('Error fetching all decks:', error);
        throw error;
    }
};

export const getDeckById = async (id) => {
    try {
        const response = await serverApi.get(`/api/decks/${id}`);
        return response.data.data;
    } catch (error) {
        console.error(`Error fetching deck with ID ${id}:`, error);
        throw error;
    }
};
