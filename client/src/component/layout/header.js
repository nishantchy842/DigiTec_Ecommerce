import React from 'react'
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  Tooltip,
  MenuItem,
  Autocomplete,
  TextField,
} from '@mui/material'
import { AiOutlineMenu } from 'react-icons/ai'
import { useNavigate } from "react-router-dom";
import DigiTec from "../../images/DigiTech.png"
import { useSelector, useDispatch } from "react-redux";
import { assignUserRole, setLoginDetails } from '../../Redux/reducer/userSlice';
import { FiLogIn, FiShoppingCart } from 'react-icons/fi'
import { toast } from 'react-toastify';



const userPages = ['Home', 'Products', 'Categories'];
const adminSide = ['Home', 'Create Category', 'Create Product', 'Products', 'Orders'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const Header = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { isLoggedIn, userRole } = useSelector(state => state.user)
  const count = useSelector(state => state.addCart.count)


  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (e) => {
    console.log(e.target.textContent)
    e.target.textContent === 'Create Product' && navigate('/product')
    e.target.textContent === 'Create Category' && navigate('/category')
    e.target.textContent === 'Products' && navigate('/products')
    e.target.textContent === 'Home' && navigate('/')
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = (e) => {
    if (e.target.textContent === 'Logout') {
      dispatch(setLoginDetails());
      dispatch(assignUserRole(''))
      toast.success("Logout successfull")
      navigate("/login")
    }
    setAnchorElUser(null);
  };
  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              <div style={{ width: '100px', height: '80px' }}>
                <img src={DigiTec} alt="logo" />
              </div>
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <AiOutlineMenu />

              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                {userRole === "user" ?
                  userPages.map((page) => (
                    <MenuItem key={page} onClick={handleCloseNavMenu}>
                      <Typography textAlign="center">{page}</Typography>
                    </MenuItem>
                  )) :
                  adminSide.map((page) => (
                    <MenuItem key={page} onClick={handleCloseNavMenu}>
                      <Typography textAlign="center">{page}</Typography>
                    </MenuItem>
                  ))
                }
              </Menu>
            </Box>
            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              <div style={{ width: '100px', height: '80px' }}>
                <img src={DigiTec} alt="logo" />
              </div>
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {
                userRole === "user" ?
                  userPages.map((page) => (
                    <Button
                      key={page}
                      onClick={handleCloseNavMenu}
                      sx={{ my: 2, color: 'white', display: 'block' }}
                    >
                      {page}
                    </Button>
                  )) :
                  adminSide.map((page) => (
                    <Button
                      key={page}
                      onClick={handleCloseNavMenu}
                      sx={{ my: 2, color: 'white', display: 'block' }}
                    >
                      {page}
                    </Button>
                  ))
              }
            </Box>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={userPages}
              sx={{ width: 300, marginRight: '50px' }}
              renderInput={(params) => <TextField {...params} label="Search" />}
            />
            <div>
            <div className='w-[25px] absolute h-[25px] text-center bg-white top-[0.65rem] right-[4.7rem] text-black rounded-full'>{count}</div>
              <FiShoppingCart className='mr-10 w-10 h-20' />
            </div>
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                {
                  isLoggedIn ?
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                    </IconButton> :
                    <FiLogIn className='cursor-pointer'
                      onClick={() => navigate('/login')}
                    />
                }
              </Tooltip>

              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  )
}

export default Header
