import { TextField, Button, Container, Paper, Box, Typography } from '@mui/material';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import { UserCredentials } from '../Types/UserCredentials';

import loginSchema, {logindata} from '../Validations/LoginSchema';
import { UserLogin } from '../Redux/reducers/userReducer';
import {  Link, useNavigate } from 'react-router-dom';

import useAppDispatch from '../Hooks/useAppDispatch';


const Login = () => {
    const [loginError, setLoginError] = useState<string | null>(null);
    
    const { handleSubmit, control, formState: { errors } } = useForm<logindata>({
        resolver: yupResolver(loginSchema)
      });

      const navigate = useNavigate();

      const dispatch = useAppDispatch();

      const onSubmit = async (data: logindata) => {
        try {
            dispatch(UserLogin(data))
            navigate("/")
        }
        catch (exception)
        {
            alert("wrong credencials")
        }
        
      };
    

    return (
        <Container
            maxWidth="md"
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
      }}
    >
      <Paper elevation={3} sx={{ p: 4, borderRadius: '16px' }}>
        <Typography variant="h4" align="center" gutterBottom>
          Sign in
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <Controller
              control={control}
              name="username"
              render={({ field: { onChange } }) => (
                <TextField
                  placeholder="username"
                  label="Enter your username"
                  onChange={onChange}
                  variant="outlined"
                  required
                />
              )}
            />
            {errors.username && (
              <Typography color="error">{errors.username.message}</Typography>
            )}
            <Controller
              control={control}
              name="password"
              render={({ field: { onChange } }) => (
                <TextField
                  label="Enter your password"
                  type="password"
                  onChange={onChange}
                  variant="outlined"
                  required
                />
              )}
            />
            {errors.password && (
              <Typography color="error">{errors.password.message}</Typography>
            )}
            <Button type="submit" variant="contained" fullWidth>
              Log in
            </Button>
            <Typography align="center"  component={Link} to="/register">
              Don't have an account?{' '}
              <span style={{ cursor: 'pointer', color: 'blue' }}>register</span>
            </Typography>
          </Box>
        </form>
      </Paper>
    </Container>
    );
}

export default Login