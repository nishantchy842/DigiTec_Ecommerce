import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Layout from '../../component/layout/layout';
import { useSelector } from 'react-redux';
import { Button } from '@mui/material';
import Admin from '../../pages/Auth/adminRoute';
import { Modal } from 'antd';
import ProfileUpdate from '../../component/Form/profileUpdate';
import axios from 'axios';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const UserDashboard = () => {
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [value, setValue] = useState(0);
  const {id } = useSelector(state => state.user)
  const [name,setName]=useState('')
  const [email,setEmail]=useState('')
  const [phone,setPhone]=useState('')
  const [address,setAddress]=useState('')

const getuser =async()=>{
  const {data}=await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/auth/userdetails/${id}`)
  if(data.success===true){
    setName(data?.user?.name)
    setEmail(data?.user?.email)
    setPhone(data?.user?.phone)
    setAddress(data?.user?.address)
  }
}
useEffect(()=>{
  getuser()
  //eslint-disable-next-line
},[setVisible])



  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Layout title={'user - Dashboard'}>
      <Box
        sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: '50vh' }}
      >
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          sx={{ borderRight: 1, borderColor: 'divider' }}
        >
          <Tab label="My Profile" {...a11yProps(0)} />
          <Tab label="My Order" {...a11yProps(1)} />
        </Tabs>
        <TabPanel value={value} index={0} className=' w-[80vw]'>
          <h1 className='text-center'>My Profile</h1>
          <div className='flex flex-col justify-center items-center mt-12'>
           <p>Full Name:{name}</p>
           <p> Mail:{email}</p>
           <p> Phone:{phone}</p>
           <p> Address:{address}</p>
           <div className='flex m-5'>
           <Button variant="contained" 
           onClick={() => {
            setVisible(true)
            // setUpdatedName(item.name)
            // setSelected(item)
          }}
           >Edit Profile</Button>
           <Button variant="contained">Change Password</Button>
           </div>
          </div>
        </TabPanel>
        <TabPanel value={value} index={1}>
         No order yet
        </TabPanel>
      </Box>
      <Modal
        title="Update Profile"
        onCancel={() => setVisible(false)}
        open={visible}
        footer={null}
      >
      <ProfileUpdate setVisible={setVisible} />
      </Modal>
    </Layout>
  );
}

export default UserDashboard
