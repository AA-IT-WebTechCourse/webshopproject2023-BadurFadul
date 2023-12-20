import React, { useEffect } from 'react';
import useAppDispatch from '../Hooks/useAppDispatch';
import { getAllProducts } from '../Redux/reducers/productReducer';
import useAppSelector from '../Hooks/useAppSelector';
import ProductCart from '../Components/ProductCart';
import {
  Container,
  Box,
  TextField,
} from '@mui/material';

const Products = () => {
  const dispatch = useAppDispatch();
  const { products, error, loading } = useAppSelector((state) => state.productReducer);

  useEffect(() => {
    dispatch(getAllProducts());
  }, []);

  if (loading) {
    return (
      <Container sx={{ height: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        Loading...
      </Container>
    );
  }
  if (error) {
    return (
      <Container sx={{ height: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        Error in the server
      </Container>
    );
  }

  return (
    <Container sx={{ marginTop: '4rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Box sx={{ marginBottom: '2rem', gap: '1rem', justifyContent: 'center', alignContent: 'center' }}>
        <TextField label="Search" required placeholder="Search for specific product" />
      </Box>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4, justifyContent: 'center' }}>
        {Array.isArray(products) &&
          products.map((product) => (
            <Box key={product.id} width={{ xs: '100%', sm: '50%', md: '33.33%', lg: '25%' }}>
              <ProductCart products={product} />
            </Box>
          ))}
      </Box>
    </Container>
  );
};

export default Products;