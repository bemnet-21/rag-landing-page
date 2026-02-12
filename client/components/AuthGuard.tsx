'use client'
import { AuthGuardProps, User } from '@/interface'
import { RootState } from '@/store'
import { logout, setUser } from '@/store/slices/auth.slice'
import { jwtDecode } from 'jwt-decode'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'


const AuthGuard = ({ children, allowedRoles}: AuthGuardProps) => {
    const { isAuthenticated, user } = useSelector((state: RootState) => state.authReducer)
    const dispatch = useDispatch()
    const router = useRouter()
    const [isChecking, setIsChecking] = useState(true)

    useEffect(() => {
        const checkAuth = () => {
            const token = localStorage.getItem("token")
            // if there is no token, logout and redirect to login
            if(!token){
                dispatch(logout())
                router.replace('/login')
                setIsChecking(false)
                return
            }
            try {

                let currentUser = user
                // if there is a token but no user in the store, decode the token and set the user in the store
                if(!isAuthenticated || !currentUser) {
                    const decodedUser = jwtDecode<User>(token)
                    const currentTime = Date.now() / 1000
                    if((decodedUser as any).exp < currentTime) {
                        dispatch(logout())
                    }
                    dispatch(setUser({user: decodedUser, token}))
                }

                // if there are allowed roles, check if the user's role is in the allowed roles
                if(allowedRoles && currentUser) {
                    const userRole = (currentUser.role || "").toLowerCase()
                    const hasAccess = allowedRoles.some(role => role.toLowerCase() === userRole)
                    if(!hasAccess) {
                        router.replace('/login')
                    }
                }

                setIsChecking(false)
            } catch(err) {
                console.error("Auth Guard Error", err)
                localStorage.clear()
                dispatch(logout())
                router.replace('/login')
            }
        }

        checkAuth()
    }, [isAuthenticated, user, allowedRoles, dispatch, router])

    if(isChecking){
        return <div>Loading...</div>
    }

    return <>{children}</>

}

export default AuthGuard