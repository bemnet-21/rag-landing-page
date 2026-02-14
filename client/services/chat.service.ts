import api from "./api"

export const sendChat = (message : string) => {
    return api.post('/chat/', { message })
}