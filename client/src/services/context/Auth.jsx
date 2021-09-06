import React,{useState} from "react"
const AuthContext=React.createContext()
const AuthProvider=({children})=>{
    const [isAuthenticated,setIsAuthenticated]=useState(false)
    const [authUser,setAuthUser]=useState({})
    const value={
        setIsAuthenticated,
        isAuthenticated,
        authUser,
        setAuthUser
        
    }
    return <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
}
export {AuthContext}
export default AuthProvider