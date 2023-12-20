import React from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Grid,
  Box,
  Typography,
  Button,
} from '@mui/material';
import useAppSelector from '../Hooks/useAppSelector';
import useAppDispatch from '../Hooks/useAppDispatch';
import { addToCart } from '../Redux/reducers/card';
import { Products } from '../Types/Products';

const SingleProduct = () => {
  const { Id } = useParams();
  const dispatch = useAppDispatch();
  const products = useAppSelector(state => state.productReducer.products);
  const product = products.find(product => product.id === Id);

  if (!product) return <div>Product not found</div>;

  const handleAddToCart = (product: Products) => {
    dispatch(addToCart(product));
  }

  const ProductImageUrl = 'https://img.freepik.com/free-photo/view-mysterious-cardboard-box_23-2149603191.jpg?t=st=1692797310~exp=1692797910~hmac=76bc782d3b8223fe8eff7e6d815a212f73bda9256eccae00454ddf4216ff83fa';

  return (
    <Container sx={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '70vh', // Full viewport height
      marginTop: '2rem',
    }}>
    <Grid container spacing={4}>
      <Grid item xs={12} md={6}>
        <Box display="flex" justifyContent="center" alignItems="center" height="100%" alignContent={'center'} justifyItems={'center'}>
        <img src={ProductImageUrl} alt={product.title} style={{ maxWidth: '100%', maxHeight: '100vh' }} />
        </Box>
      </Grid>
      <Grid item xs={12} md={6}>
        <Box display="flex" flexDirection="column" justifyContent="center" alignItems="flex-start" height="100%" gap={2}>
          <Typography variant="h4">{product.title}</Typography>
          <Typography variant="body1" sx={{ color: 'grey' }}>{product.description}</Typography>
          <Typography variant="h6">{product.price} €</Typography>
          <Button variant="contained" onClick={() => handleAddToCart(product)}>Add to Cart</Button>
        </Box>
      </Grid>
    </Grid>
  </Container>
  );
}

export default SingleProduct;