import { Button, Form, Input, Radio } from 'antd';
import axios from 'axios';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { setLoginDetails } from '../../Redux/reducer/userSlice';


const ProfileUpdate = ({setVisible}) => {
  const {name,email,phone,address,id,role,isLoggedin } = useSelector(state => state.user)
   //state
   const [updateName, setupdateName] = useState(name);
   const [UpdateEmail, setUpdateEmail] = useState(email);
   const [updatePhone, setUpdatePhone] = useState(phone);
   const [updateAddress, setUpdateAddress] = useState(address); 

   const dispatch = useDispatch()

   const handleSubmit=async(value)=>{
    try{
        const {data} = await axios.put(`${process.env.REACT_APP_BASE_URL}/api/v1/auth/profile-update/${id}`,{
          name:updateName,
          email:UpdateEmail,
          phone:updatePhone,
          address:updateAddress
        })
        toast.success(data.message)
        setVisible(false)
    }catch(error){
      toast.error("something error while updating profile")
    }
   }


  return (
    <Form
      onFinish={handleSubmit}
      style={{
        maxWidth: 600,
      }}
    >

      <Form.Item label="Name">
        <Input
        value={updateName}
        onChange={(e)=>setupdateName(e.target.value)}
        placeholder="Name" 
        autoFocus/>
      </Form.Item>
      <Form.Item label="email">
        <Input 
        value={UpdateEmail}
        onChange={(e)=>setUpdateEmail(e.target.value)}
        placeholder="email" />
      </Form.Item>
      <Form.Item label="Phone Number">
        <Input 
        type='number'
        value={updatePhone}
        onChange={(e)=>setUpdatePhone(e.target.value)}
         placeholder="Phone Number" />
      </Form.Item>
      <Form.Item label="Address">
        <Input 
        value={updateAddress}
        onChange={(e)=>setUpdateAddress(e.target.value)}
        placeholder="Address" />
      </Form.Item>
      <Form.Item >
        <Button type="primary" htmlType="submit">Submit</Button>
      </Form.Item>
    </Form>
  );
};
export default ProfileUpdate;