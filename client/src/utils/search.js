// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { searchProduct,searchKeyword } from "../Redux/reducer/searchSlice";
// import { useDispatch } from "react-redux";
// const SearchInput = () => {
//   const [values, setValues]=useState()
//   const navigate = useNavigate();
//  const dispatch = useDispatch()

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const { data } = await axios.get(
//         `${process.env.REACT_APP_BASE_URL}/api/v1/product/search/${values.keyword}`
//       );
//       // setValues({ ...values, results: data });
//       dispatch(searchProduct({ ...values, result: data }))
//       navigate("/search");
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   return (
//     <div>
//       <form
//         className="d-flex search-form"
//         role="search"
//         onSubmit={handleSubmit}
//       >
//         <input
//           className=" bg-slate-900"
//           type="search"
//           placeholder="Search"
//           aria-label="Search"
//           // value='ffff'
//           onChange={(e) => setValues({ ...values, keyword: e.target.value })}
//         />
//         <button className="btn btn-outline-success" type="submit">
//           Search
//         </button>
//       </form>
//     </div>
//   );
// };

// export default SearchInput;

import React from 'react'

const Search = (props) => {
    return (
        <>
            <input onKeyUp={(e) => props.getAllProducts('1', e.target.value)} placeholder='serach orders..'></input>
        </>
    )
}
export default Search