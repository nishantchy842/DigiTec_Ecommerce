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
    const total = useSelector(state => state.addCart.total)
    return (
    <IconButton aria-label="cart" style={{marginRight:'30px'}}>
      <StyledBadge badgeContent={total} color="secondary">
        <BsFillCartPlusFill style={{width:'50px', height:'40px'}} 
        onClick={()=>navigate('/cart')}
        />
      </StyledBadge>
    </IconButton>
  );
}
export default AddtoCart