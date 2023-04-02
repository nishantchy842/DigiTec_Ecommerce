
import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Layout from '../component/layout/layout'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@mui/material';
import { removeProduct, favProduct } from '../Redux/reducer/countSlice';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const MyFavProduct = () => {
  const cartProduct = useSelector(state => state.addCart.addToCart)
  console.log(cartProduct)
  const total = useSelector(state => state.addCart.total)
  let sum = 0

  cartProduct.map(item => {
    return sum += item.count * item.price

  })


  const dispatch = useDispatch()

  return (
    <Layout>


      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={8} >
            <div>
              <Item sx={{ minHeight: '80vh', }}>
                <Item sx={{ fontWeight: '200px', fontSize: '2rem', backgroundColor: '#1a1d4e', color: 'white' }} >My Carts</Item>
                {total === 0 ? "You have no items in your shopping cart." :

                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650, marginTop: '30px' }} size="small" aria-label="a dense table">
                      <TableHead>
                        <TableRow sx={{ backgroundColor: '#a2ded0' }}>
                          <TableCell>Name</TableCell>
                          <TableCell align="right">Price</TableCell>
                          <TableCell align="right">Quantity</TableCell>
                          <TableCell align="right">Total</TableCell>
                        </TableRow>
                      </TableHead>

                      {
                        cartProduct.map(item => {
                          return (
                            <TableBody key={item._id}>
                              <TableRow >
                                <TableCell component="th" scope="row" width={500}>
                                  <div className='flex text-center'>
                                    <img width={100} height={100} alt='/' src={`${process.env.REACT_APP_BASE_URL}/api/v1/product/product-photo/${item._id}`} />
                                    <p className='ml-4'> {item.name}</p>
                                  </div>
                                </TableCell>
                                <TableCell align="right">{item.price}</TableCell>
                                <TableCell align="right">
                                  <Button variant="contained"
                                    onClick={()=>dispatch(removeProduct(item))}
                                  >
                                    -
                                  </Button>
                                  {item.count}
                                  <Button variant="contained"
                                    className='bg-[#ff007f] w-10'
                                    onClick={()=>dispatch(favProduct(item))}
                                  >+</Button>
                                </TableCell>
                                <TableCell align="right">{item.price * item.count}</TableCell>
                              </TableRow>
                            </TableBody>
                          )
                        })
                      }


                    </Table>
                  </TableContainer>
                }
              </Item>
            </div>
          </Grid>
          <Grid item xs={4}>
            <Item sx={{ height: '50vh' }}>
              <Item sx={{ fontWeight: '200px', fontSize: '2rem', backgroundColor: '#1a1d4e', color: 'white' }}>Order Summary</Item>

              <p>Total Item: {total}</p>

              <p>Total Price:{sum}</p>
              <Button variant='contained'>Place Order</Button>

            </Item>
          </Grid>
        </Grid>
      </Box>

    </Layout>
  );
}
export default MyFavProduct