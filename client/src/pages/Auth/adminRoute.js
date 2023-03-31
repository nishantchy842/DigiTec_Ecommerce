import { Button } from '@mui/material'
import axios from 'axios'
import React from 'react'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { assignUserRole, setLoginDetails } from '../../Redux/reducer/userSlice';
import { useNavigate } from 'react-router-dom'

const Admin = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { token } = useSelector(state => state.user)
    console.log(token)
    const handleClick = async () => {
        console.log("hi i am admin")
        try {
            // const token = localStorage.getItem("token");
            const res =await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/auth/admin-auth`, {
                headers: {
                    "Authorization": token // include token in Authorization header
                }
            })
           console.log(res.data.ok)
           if(res.data.ok===true){
            dispatch(assignUserRole('admin'))
            navigate('/')
           }
        } catch (error) {
            toast.error("something error while switching to admin dashboard")
        }
    }
    return (
        <div>
            <Button variant="contained" onClick={() => handleClick()}>Switch to Admin</Button>
        </div>
    )
}

export default Admin
