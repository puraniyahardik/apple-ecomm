// import axios from 'axios'
// import React, { useEffect, useState } from 'react'
// import { BackendUrl } from '../App'
// import { toast } from 'react-toastify'

// const List = ({token}) => {
//   const [list,setList]=useState([])

//   const fetchList=async()=>{
//     try {
//       const respones=await axios.get(BackendUrl+'/api/product/list')
//       console.log(respones)
//       if(respones.data.success)
//       {
//         setList(respones)
//       }
//       else{
//         toast(respones.data.message)
//       }
//       console.log(list)
//     } catch (error) {
//       console.log(error)
//     }
//   }

//   useEffect(()=>{
//     fetchList()
//   },[list])
//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-semibold mb-4">All Products List</h1>
//       <div className="overflow-x-auto">
//         <table className="min-w-full border border-gray-300">
//           <thead>
//             <tr className="bg-gray-100">
//               <th className="px-4 py-2 text-left">Image</th>
//               <th className="px-4 py-2 text-left">Name</th>
//               <th className="px-4 py-2 text-left">Category</th>
//               <th className="px-4 py-2 text-left">Price</th>
//               <th className="px-4 py-2 text-left">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {
//             list.map((list) => (
//               <tr key={list.id} className="border-t hover:bg-gray-50">
//                 <td className="px-4 py-2">
//                   <img
//                     src={list.image}
//                     alt={list.name}
//                     className="w-12 h-12 object-cover rounded"
//                   />
//                 </td>
//                 <td className="px-4 py-2">{list.name}</td>
//                 <td className="px-4 py-2">{list.category}</td>
//                 <td className="px-4 py-2">{list.price}</td>
//                 <td className="px-4 py-2">
//                   <button
//                     className="text-red-500 hover:text-red-700 focus:outline-none"
//                     onClick={() => alert(`Remove ${list.name}`)}
//                   >
//                     X
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// export default List

import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';


const List = ({ token }) => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`, {
        headers: { Authorization: `Bearer ${token}` }, // If token is needed for authentication
      });
      console.log(response);
      if (response.data.success) {
        setList(response.data.product); // Set the product array in the state
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to fetch the product list');
    }
  };

  const deleteProductData=async(id)=>{
    try {

      const respone=await axios.post(BackendUrl+'/api/product/remove',{id},{headers:{token}})
      console.log(respone)
      if(respone.data.success)
      {
        toast.success(respone.data.message)
        await fetchList()
      }
      else{
        toast.error(respone.data.message)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    fetchList()
    
  },[])

  
  // useEffect(() => {
  //   // fetchList();
    
    
  // }, [list]); // Empty dependency array ensures the effect runs only once

 
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">All Products List</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left">Image</th>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Category</th>
              <th className="px-4 py-2 text-left">Price</th>
              <th className="px-4 py-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {list.map((product) => (
              <tr key={product._id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-2">
                  <img
                    src={product.image[0]} // Display the first image from the array
                    alt={product.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                </td>
                <td className="px-4 py-2">{product.name}</td>
                <td className="px-4 py-2">{product.description}</td> {/* Assuming category is not provided */}
                <td className="px-4 py-2">${product.price}</td>
                <td className="px-4 py-2">
                  <button
                    className="text-red-500 hover:text-red-700 focus:outline-none"
                    onClick={()=>deleteProductData(product._id)}
                  >
                    X
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default List;

