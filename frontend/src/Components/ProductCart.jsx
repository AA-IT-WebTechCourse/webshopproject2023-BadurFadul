import React from 'react';
import LocalGroceryStoreOutlinedIcon from '@mui/icons-material/LocalGroceryStoreOutlined';
import { Link } from 'react-router-dom';
import {
  Typography,
  Paper,
  Box,
  IconButton,
} from '@mui/material';

import useAppDispatch from '../Hooks/useAppDispatch';
import { addToCart } from '../Redux/reducers/card';

const ProductCart = ({ products }) => {
  const dispatch = useAppDispatch();

  const handleAddToCart = () => {
    console.log("Adding to cart:", products);
    dispatch(addToCart(products));
  }

  // Use your actual image URL here
  const productImageUrl = 'https://img.freepik.com/free-photo/view-mysterious-cardboard-box_23-2149603191.jpg?t=st=1692797310~exp=1692797910~hmac=76bc782d3b8223fe8eff7e6d815a212f73bda9256eccae00454ddf4216ff83fa';

  return (
    <Paper elevation={3} sx={{ display: 'flex', flexDirection: 'column', height: '400px' }}>
      <Link to={`/products/${products.Id}`}>
        <img className='img' src={productImageUrl} alt='Product' style={{ width: '100%', height: 'auto' }} />
      </Link>
      <Box flexGrow={1} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <Box>
          <Typography variant='h6' sx={{ mb: 1 }}>
            {products.name}
          </Typography>
          <Typography variant='body2' color='textSecondary'>
            {products.description}
          </Typography>
        </Box>
        <Box display='flex' alignItems='center' justifyContent='space-between'>
          <Typography variant='h6'>
            {products.price} €
          </Typography>
          <IconButton color='primary' onClick={handleAddToCart}>
            <LocalGroceryStoreOutlinedIcon />
          </IconButton>
        </Box>
      </Box>
    </Paper>
  );
}

export default ProductCart;