import api from "./api"

export const uploadDocument = (file: File) => {
    const formData = new FormData()
    formData.append('file', file) 
    return api.post('/document/upload/', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })  
}

export const getDocuments = () => {
    return api.get('/document/')
}

export const deleteDocument = (id: string) => {
    return api.delete(`/document/${id}/`)
}