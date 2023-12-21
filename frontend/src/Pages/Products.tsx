import React, { useEffect, useState } from 'react';
import useAppDispatch from '../Hooks/useAppDispatch';
import { getAllProducts } from '../Redux/reducers/productReducer';
import useAppSelector from '../Hooks/useAppSelector';
import ProductCart from '../Components/ProductCart';
import {
  Container,
  Box,
  TextField,
} from '@mui/material';
import axios from 'axios';

const Products = () => {
  const dispatch = useAppDispatch();
  const { products, error, loading } = useAppSelector((state) => state.productReducer);

  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  // Function to handle the search action
  const handleSearch = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/search/', {
        params: { title: searchTerm }
      });
      setSearchResults(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

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
      <TextField
        label="Search"
        required
        placeholder="Search for specific product"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
    </Box>
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4, justifyContent: 'center' }}>
      {searchResults.length > 0 ? (
        searchResults.map((product, index) => (
          <Box key={index} width={{ xs: '100%', sm: '50%', md: '33.33%', lg: '25%' }}>
            <ProductCart products={product} />
          </Box>
        ))
      ) : (
        Array.isArray(products) &&
        products.map((product) => (
          <Box key={product.id} width={{ xs: '100%', sm: '50%', md: '33.33%', lg: '25%' }}>
            <ProductCart products={product} />
          </Box>
        ))
      )}
    </Box>
  </Container>
  );
};

export default Products;