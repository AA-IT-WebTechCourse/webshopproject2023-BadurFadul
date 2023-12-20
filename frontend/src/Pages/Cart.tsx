import React from 'react';
import {
  Dialog,
  DialogTitle,
  IconButton,
  DialogContent,
  Grid,
  Paper,
  Typography,
  CircularProgress,
  Box,
  Button,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

import useAppSelector from '../Hooks/useAppSelector';
import useAppDispatch from '../Hooks/useAppDispatch';
import {
  removeProductFromCart,
  updateProductQuantityInCart,
  addToCart,
  emptyCart,
} from '../Redux/reducers/card';

interface CartProps {
  open: boolean;
  handleClose: () => void;
}

const Cart: React.FC<CartProps> = ({ open, handleClose }) =>  {
  const { items, loading, error } = useAppSelector((state) => state.cardReducer);
  const dispatch = useAppDispatch();

  const handleDecreaseQuantity = (productId: any) => {
    const existingItem = items.find((item) => item.product.id === productId);
    if (existingItem && existingItem.quantity > 1) {
      const newQuantity = existingItem.quantity - 1;
      dispatch(updateProductQuantityInCart({ productId, quantity: newQuantity }));
    }
  };

  const handleRemove = (productId: any) => {
    dispatch(removeProductFromCart(productId));
  };

  const handleEmptyCart = () => {
    dispatch(emptyCart());
  };

  const ProductImageUrl =
    'https://img.freepik.com/free-photo/view-mysterious-cardboard-box_23-2149603191.jpg?t=st=1692797310~exp=1692797910~hmac=76bc782d3b8223fe8eff7e6d815a212f73bda9256eccae00454ddf4216ff83fa';

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth='sm'
      sx={{
        '& .MuiDialog-paper': {
          m: 0,
          position: 'absolute',
          right: 0,
          top: 0,
          maxHeight: '100%',
          overflow: 'auto',
          width: '40%',
          height: '100%',
        },
      }}
    >
      <DialogTitle>
        Your Shopping Cart
        <IconButton edge='end' color='inherit' onClick={handleClose} aria-label='close'>
          <CloseIcon />
        </IconButton>
        {items.length > 0 && (
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <IconButton>
              <DeleteOutlineOutlinedIcon onClick={handleEmptyCart}>
                Empty Cart
              </DeleteOutlineOutlinedIcon>
            </IconButton>
          </Box>
        )}
      </DialogTitle>
      <DialogContent>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <Typography variant='h6'>{error}</Typography>
          </Box>
        ) : items.length === 0 ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <Typography variant='h6'>Your cart is empty</Typography>
          </Box>
        ) : (
          items.map((item) => (
            <Grid item xs={12} md={8} key={item.product.id} sx={{ marginBottom: '1rem' }}>
              <Paper>
                <img src={`${ProductImageUrl}`} alt={item.product.title} style={{ width: '100%' }} />
                <h4>{item.product.title}</h4>
                <Box sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                  <Box>
                    <Typography>{item.product.price * item.quantity} €</Typography>
                  </Box>
                  <Box>Quantity {item.quantity}</Box>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                  <Box>
                    <IconButton
                      onClick={() => item.product.id && handleDecreaseQuantity(item.product.id)}
                      disabled={item.quantity === 1}
                      sx={{ fontSize: '.7rem', width: '1rem' }}
                    >
                       <RemoveIcon />
                    </IconButton>
                  </Box>
                  <Box>
                    <IconButton
                      onClick={() => dispatch(addToCart(item.product))}
                    >
                       <AddIcon />
                    </IconButton>
                  </Box>
                  <Box>
                    <Button
                      variant='outlined'
                      size='small'
                      color='error'
                      onClick={() => item.product.id && handleRemove(item.product.id)}
                    >
                      remove
                    </Button>
                  </Box>
                </Box>
              </Paper>
            </Grid>
          ))
        )}
      </DialogContent>
    </Dialog>
  );
};

export default Cart;
