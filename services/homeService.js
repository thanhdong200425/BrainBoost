import axios from 'axios'
import serverApi from '../helpers/axios'

export const getHomeData = async () => {
    try {
        const response = await serverApi.get('/api/home')
        return response.data.data
    } catch (error) {
        console.error('Error fetching home data:', error)
        throw error
    }
}

export const generateDeckWithAI = async (params = {}) => {
    try {
        const {
            topic = 'capitals of Southeast Asia',
            level = 'beginner',
            quantity = 10,
        } = params

        const response = await serverApi.post(
            '/ai/flashcards/auto-generate',
            {
                topic,
                level,
                quantity,
            },
            { timeout: 100000 },
        )
        return response.data.response
    } catch (error) {
        console.error('Error generating deck with AI:', error)
        throw error
    }
}
