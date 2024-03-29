import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  userRole: '',
  isLoggedIn: false,
  token: '',
  id: '',
  name:'',
  phone:'',
  email:'',
  address:'',
  role:''
};

//What is createSlice in Redux Toolkit?
//createSlice is a higher order function that accepts an initial state, an object full of reducer functions and a slice name. 

// In Redux-Toolkit, the createSlice method helps us create a slice of the redux-store.
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    assignUserRole: (state, actions) => {
      state.userRole = actions.payload
    },
    setLoginDetails: (state, actions)=>{
      if(actions.payload){
        const {token, id, name, phone, email, address,role} = actions.payload
        state.token = token
        state.id = id
        state.name = name
        state.phone = phone
        state.email = email
        state.address = address
        state.role = role
      }
      state.isLoggedIn = !state.isLoggedIn
    }
  }
});

export const { assignUserRole,setLoginDetails } = userSlice.actions;
export default userSlice.reducer;