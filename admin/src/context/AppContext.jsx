import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";

export const ShopContext = createContext();

const ContextProvider = ({ children }) => {
    const [token, setToken] = useState('');
    const [isDarkMode, setIsDarkMode] = useState(false);

    // save login info
    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            setToken(storedToken);
        }
    }, []);

    useEffect(()=>{
        localStorage.setItem('dark',isDarkMode);
    }, [isDarkMode])
    useEffect(()=>{
        const dark = localStorage.getItem('dark');
        setIsDarkMode(dark);3
    }, [ ])

  

    const value = {
        token,
        setToken,
        isDarkMode,
        setIsDarkMode
    }
    return (
        <ShopContext.Provider value={value}>
            {children}
        </ShopContext.Provider>
    )
}
export default ContextProvider;