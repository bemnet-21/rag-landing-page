import api from "./api"

export const login = async (email:string, password:string) => {
    return api.post("/auth/login", { email, password })
}
export const signup = async (email:string, password:string, full_name:string) => {
    return api.post("/auth/signup", { email, password, full_name })
}