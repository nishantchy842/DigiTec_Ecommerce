import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Layout from '../../component/layout/layout';
import { useSelector } from 'react-redux';
import { Button } from '@mui/material';

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
  const [value, setValue] = useState(0);
  const {name,email,phone,address } = useSelector(state => state.user)


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
           <Button variant="contained">Edit Profile</Button>
           <Button variant="contained">Change Password</Button>
           </div>
          </div>
        </TabPanel>
        <TabPanel value={value} index={1}>
         No order yet
        </TabPanel>
      </Box>
    </Layout>
  );
}

export default UserDashboard
