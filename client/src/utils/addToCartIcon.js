import * as React from 'react';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import {BsFillCartPlusFill} from 'react-icons/bs'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));

const AddtoCart =()=> {
    const navigate = useNavigate()
    const {count} = useSelector(state=>state.addCart)
  return (
    <IconButton aria-label="cart" style={{marginRight:'30px'}}>
      <StyledBadge badgeContent={count} color="secondary">
        <BsFillCartPlusFill style={{width:'50px', height:'40px'}} 
        onClick={()=>navigate('/liked-product')}
        />
      </StyledBadge>
    </IconButton>
  );
}
export default AddtoCart