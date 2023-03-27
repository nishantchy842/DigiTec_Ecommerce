import React,{useState} from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import { useLocation } from 'react-router-dom';
import Layout from '../component/layout/layout';
import { useDispatch } from 'react-redux';
import { increaseCart,decreaseCart } from '../Redux/reducer/countSlice';
import { toast } from 'react-toastify';
const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});


const Product = () => {
  const { state } = useLocation()
  console.log(state)
  const [cartCount, setCartCout] = useState(0)
  const dispatch = useDispatch()
  const handleDecre =()=>{
    if(cartCount>0){
      setCartCout(cartCount-1)
      dispatch(decreaseCart())
    }
  }
  const handleInc =()=>{
    console.log(state.quantity)
    if(cartCount<state.quantity){
      setCartCout(cartCount+1)
      dispatch(increaseCart())
      
    }else{
      toast.error("outofstock")
    }
  }
  return (
    <Layout>
      <Paper
        sx={{
          p: 2,
          marginTop: '20px',
          margin: 'auto',
          maxWidth: 900,
          minHeight: 500,
          flexGrow: 1,
          backgroundColor: (theme) =>
            theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        }}
      >
        <Grid container spacing={2}>
          <Grid item>
            <ButtonBase sx={{ width: 300, height: 228 }}>
              <Img alt="complex" src={`${process.env.REACT_APP_BASE_URL}/api/v1/product/product-photo/${state._id}`} />
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1" component="div">
                  {state.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  SKU: {state.slug}
                </Typography>
                <Typography variant="body2" gutterBottom sx={{ marginTop: '20px' }}>
                  ABOUT PRODUCT<br />
                  {state.description}
                </Typography>
              </Grid>
              <Grid item>
                <Typography sx={{ cursor: 'pointer' }} variant="body2">
                  <div className='flex justify-center'>
                    <button 
                    className='bg-[#ff007f] w-10'
                    onClick={handleInc}
                    >+</button>
                    <input 
                    type='number'  
                    className='w-10 h-8 m-2 text-center border'
                    value={cartCount}
                    onChange={(e) => setCartCout(e.target.value)}
                    />
                    <button 
                    className='bg-[#ff007f] w-10'
                    onClick={handleDecre}
                     >
                     -
                     </button>
                  </div>
                  <div className='flex justify-center mt-3'>
                    <button className='bg-[#ff007f] mr-3 p-2' >BUY </button>
                    <button className='bg-[#ff007f]'>ADD TO CART</button>
                  </div>
                </Typography>
              </Grid>
            </Grid>
            <Grid item>
              <Typography variant="subtitle1" component="div" color="white" sx={{ backgroundColor: '#ff007f', padding: '5px' }}>
                Nrs {state.price}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <div className='w-full bg-[red] mt-10 text-center'>
          Comments
        </div>
      </Paper>
    </Layout>
  )
}

export default Product
