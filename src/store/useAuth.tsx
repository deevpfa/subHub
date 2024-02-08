export {}
// // contexts/auth.js

// import React, { createContext, useState, useContext, useEffect } from 'react'
// import Cookies from 'js-cookie'
// import { doGet, doPost } from '../pages/api/functions';
// import { iUser } from '../interfaces/user';


// interface AuthProviderProps {
//     children: React.ReactNode;
// }

// interface AuthContextProps {
//     isAuthenticated: boolean;
//     user: iUser | null;
//     login: (email : string, password : string) => void;
//     loading: boolean;
//     logout: () => void;
// }


// const AuthContext : any = createContext({});

// export const AuthProvider = ({ children } : AuthProviderProps) => {

//     const [user, setUser] = useState<iUser | null>(null)
//     const [loading, setLoading] = useState(true)

//     useEffect(() => {
//         async function loadUserFromCookies() {
//             const token = Cookies.get('token')
//             if (token) {
//                 console.log("Got a token in the cookies, let's see if it is valid")
//                 // api.defaults.headers.Authorization = `Bearer ${token}`
//                 const { data: user } = await doGet('validateToken')
//                 if (user) setUser(user);
//             }
//             setLoading(false)
//         }
//         // loadUserFromCookies()
//     }, [])

//     const login = async (email : string, password : string) => {
//         const { token , user } = await doPost('auth/login', { email, password })
//         // const { setUserData } = User()
//         if (token) {
//             console.log("Got token")
//             Cookies.set('token', token, { expires: 60 })
//             // api.defaults.headers.Authorization = `Bearer ${token.token}`
//             // const { data: user } = await api.get('users/me')
//             setUser(user)
//             // setUserData(user)
//         }
//         return { token, user }
//     }

//     const logout = () => {
//         Cookies.remove('token')
//         setUser(null)
//         // delete api.defaults.headers.Authorization
//         window.location.pathname = '/login'
//     }


//     return (
//         <AuthContext.Provider value={{ isAuthenticated: !!user, user, login, loading, logout }}>
//             {children}
//         </AuthContext.Provider>
//     )
// }



// export const useAuth = () : AuthContextProps  => useContext(AuthContext)