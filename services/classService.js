import serverApi from '../helpers/axios'

export const getAllClasses = async () => {
    try {
        const response = await serverApi.get('/api/home')
        return response.data.data.classes
    } catch (error) {
        console.error('Error fetching all classes:', error)
        throw error
    }
}

export const getClassById = async (id) => {
    try {
        const response = await serverApi.get(`/api/classes/${id}`)
        return response.data.data
    } catch (error) {
        console.error(`Error fetching class with ID ${id}:`, error)
        throw error
    }
}

export const createClass = async (classData) => {
    try {
        const response = await serverApi.post('/api/classes', classData)
        return response.data.data
    } catch (error) {
        console.error('Error creating class:', error)
        throw error
    }
}

export const updateClass = async (id, classData) => {
    try {
        const response = await serverApi.put(`/api/classes/${id}`, classData)
        return response.data.data
    } catch (error) {
        console.error(`Error updating class with ID ${id}:`, error)
        if (error.response && error.response.status === 403) {
            const errorMessage =
                error.response.data?.message ||
                'You do not have permission to update this class'
            throw new Error(errorMessage)
        }
        throw error
    }
}

export const deleteClass = async (id) => {
    try {
        const response = await serverApi.delete(`/api/classes/${id}`)
        return response.data
    } catch (error) {
        console.error(`Error deleting class with ID ${id}:`, error)
        if (error.response && error.response.status === 403) {
            const errorMessage =
                error.response.data?.message ||
                'You do not have permission to delete this class'
            throw new Error(errorMessage)
        }
        throw error
    }
}

export const getClassDecks = async (classId) => {
    try {
        const response = await serverApi.get(`/api/classes/${classId}/decks`)
        return response.data.data
    } catch (error) {
        console.error(`Error fetching decks for class ${classId}:`, error)
        throw error
    }
}

export const addDeckToClass = async (classId, deckId) => {
    try {
        const response = await serverApi.post(`/api/classes/${classId}/decks`, {
            deckId,
        })
        return response.data
    } catch (error) {
        console.error('Error adding deck to class:', error)
        if (error.response && error.response.status === 400) {
            const errorMessage =
                error.response.data?.message ||
                'Deck is already added to this class'
            throw new Error(errorMessage)
        }
        throw error
    }
}

export const removeDeckFromClass = async (classId, deckId) => {
    try {
        const response = await serverApi.delete(
            `/api/classes/${classId}/decks/${deckId}`,
        )
        return response.data
    } catch (error) {
        console.error('Error removing deck from class:', error)
        throw error
    }
}
