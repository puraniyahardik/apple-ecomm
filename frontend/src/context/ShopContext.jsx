import { createContext, useEffect, useState } from "react";
// import { products } from "../assets/frontend_assets/assets.js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios"

export const ShopContext=createContext();

const ShopContextProvider=({children})=>{
    const navigate=useNavigate()
    const currency="$";
    const delivery_fee=10;
    const BackendUrl=import.meta.env.VITE_BACKEND_URL;
    const [search,setSearch]=useState('');
    const [showSearch,setShowSearch]=useState(false)
    const [products,setProducts]=useState([])
    let  [token,setToken]=useState('')
    const [cartItems,setCartItems]=useState({});
    const [data,setData]=useState([])
    const [isDarkMode, setIsDarkMode] = useState(() => {
        return localStorage.getItem('theme') === 'dark'
    });
    const addToCart=async(itemId,size)=>{
        let cartData=structuredClone(cartItems);

        if(!size)
        {
            toast.error("Select Product Size  ")
        }
        
        if(cartData[itemId])
        {
            if(cartData[itemId][size])
            {
                cartData[itemId][size]+=1;
            }
            else{
                cartData[itemId][size]=1;
            }

        }else{
            cartData[itemId]={};
            cartData[itemId][size]=1;
        }
        setCartItems(cartData);

        if(token){
            try {
               const respones= await axios.post(BackendUrl+'/api/cart/add',{itemId,size},{headers:{token}})
               if(respones.data.success){
                    toast.success(respones.data.message)
                    // setCartItems(cartData)
               } 
            } catch (error) {
                console.log(error)
                toast.error(respones.data.message)
            }
        }
    }

    useEffect(()=>{
        console.log(cartItems)
    },[cartItems])

    const getCartCount=()=>{
        let totalCount=0;
        for(const x in cartItems)
        {
            for(const y in cartItems[x])
            {
                try {
                    if(cartItems[x][y]>0)
                    {
                        totalCount+=cartItems[x][y];
                    }
                } catch (error) {
                    console.log("TotalCount Error:",error);
                }
            }
        }
        return totalCount;
    }
    const updateQuntity=async(itemId,size,quantity)=>{
        let cartData=structuredClone(cartItems);
        cartData[itemId][size]=quantity;
        setCartItems(cartData);

        try {
            const respones=await axios.post(BackendUrl+'/api/cart/update',{itemId,size,quantity},{headers:{token}})
            if(respones.data.success)
            {
                toast.success(respones.data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(respones.data.message)
        }
    }

    const getCartAmount=()=>{
        let totalAmount=0;
        for(const x in cartItems)
        {
            let itemInfo=products.find((item)=>item._id===x)
            for(const y in cartItems[x])
            {try {
                if(cartItems[x][y]>0)
                    {
                        totalAmount+= itemInfo.price * cartItems[x][y]; //Price * Quantity of Product
    
                    }
            } catch (error) {
                console.log("AMOUNT ERROR:",error);
            }
                
            }
        }
        return totalAmount;
    }


    const getProductData=async()=>{
        try {
            const respones=await axios.get(BackendUrl+'/api/product/list')

            console.log(respones.data.product)
            if(respones.data.success){

                setProducts(respones.data.product)
            }else{
                toast.error(respones.data.message)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const getUserCart=async()=>{
        try {
            
            const respones = await axios.post(
                BackendUrl+'/api/cart/get',
                {},
                {
                    headers: { token }, // Ensure the token is valid
                }
            );
            console.log(respones)
            if(respones.data.success){
                setCartItems(respones.data.cartData)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }
    
    const toggleDarkMode = () => {
        setIsDarkMode((prev) =>  !prev)}
    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');

        } else {
            document.documentElement.classList.remove('dark');

        }
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    }, [isDarkMode]);
     
    useEffect(()=>{
        getProductData();
        // setToken(localStorage.getItem('token'))
    },[])

    // useEffect(()=>{
    //     if (token) {
            
    //         setToken(localStorage.getItem('token'))
            
    //         getUserCart()
    //     }
    // },[])
    useEffect(() => {
        const savedToken = localStorage.getItem('token'); // Retrieve token from localStorage
        if (savedToken) {
            setToken(savedToken); // Set token in state
        } else {
            console.error("No token found in localStorage");
        }
    }, []); // Run once on component mount

    // Fetch cart when token is set
    useEffect(() => {
        if (token) {
            getUserCart();
            // Call getUserCart only when token is available
        }
    }, [token]); 

    // useEffect( () => {
    //    localStorage.setItem('dark',isDarkMode);
    // }, [isDarkMode]);

    // useEffect( () => {
    // const dark = localStorage.getItem('dark');
    // dark ? setIsDarkMode(true) : setIsDarkMode(false);
    // }, []);


    //logout 
    const Logout = () => {
        navigate('/login')
        localStorage.removeItem('token')
        setToken('')
        setCartItems({})
    }


    const forgotPasswordRequest = async (email) => {
        console.log('Sending forgot password request for:', email);
        try {
          const response = await axios.post(`${BackendUrl}/api/user/forgot-password`, { email });
          console.log('Forgot Password Response:', response.data);
          if (response.data.success) {
            toast.success(response.data.message, { autoClose: 5000 }); // Ensure visibility
          } else {
            toast.error(response.data.message);
          }
        } catch (error) {
          console.error('Forgot Password Error:', error.response?.data || error.message);
          toast.error(error.response?.data?.message || 'Failed to send reset link');
        }
      };
   
    const value={
        products,
        forgotPasswordRequest,
        Logout,
        currency,
        delivery_fee,
        search,
        setSearch,
        showSearch,
        setShowSearch,
        cartItems,
        addToCart,
        getCartCount,
        updateQuntity,
        getCartAmount,
        navigate,
        BackendUrl,
        token,
        setToken,
        setCartItems,
        setData,
        data,
        isDarkMode,
        setIsDarkMode,
        toggleDarkMode
    }

    return (
        <ShopContext.Provider value={value}>
            {children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;