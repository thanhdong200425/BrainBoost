import serverApi from '../helpers/axios'

export const getTotalFolders = async () => {
    try {
        const response = await serverApi.get('/api/total_folders')
        return response.data.data
    } catch (error) {
        console.error('Error fetching total folders:', error)
        throw error
    }
}

export const getAllFolders = async () => {
    try {
        const response = await serverApi.get('/api/home')
        return response.data.data.folders
    } catch (error) {
        console.error('Error fetching all folders:', error)
        throw error
    }
}

export const getFolderById = async (id) => {
    try {
        const response = await serverApi.get(`/api/folders/${id}`)
        return response.data.data
    } catch (error) {
        console.error(`Error fetching folder with ID ${id}:`, error)
        throw error
    }
}

export const createFolder = async (folderData) => {
    try {
        const response = await serverApi.post('/api/folders', folderData)
        return response.data.data
    } catch (error) {
        console.error('Error creating folder:', error)
        throw error
    }
}

export const updateFolder = async (id, folderData) => {
    try {
        const response = await serverApi.put(`/api/folders/${id}`, folderData)
        return response.data.data
    } catch (error) {
        console.error(`Error updating folder with ID ${id}:`, error)
        throw error
    }
}

export const deleteFolder = async (id) => {
    try {
        const response = await serverApi.delete(`/api/folders/${id}`)
        return response.data
    } catch (error) {
        console.error(`Error deleting folder with ID ${id}:`, error)
        throw error
    }
}

export const getFolderDecks = async (folderId) => {
    try {
        const response = await serverApi.get(`/api/folders/${folderId}/decks`)
        return response.data.data
    } catch (error) {
        console.error(`Error fetching decks for folder ${folderId}:`, error)
        throw error
    }
}

export const addDeckToFolder = async (folderId, deckId) => {
    try {
        const response = await serverApi.post('/api/folders/add-deck', {
            folderId,
            deckId,
        })
        return response.data
    } catch (error) {
        console.error('Error adding deck to folder:', error)
        throw error
    }
}

export const removeDeckFromFolder = async (folderId, deckId) => {
    try {
        const response = await serverApi.post('/api/folders/remove-deck', {
            folderId,
            deckId,
        })
        return response.data
    } catch (error) {
        console.error('Error removing deck from folder:', error)
        throw error
    }
}
