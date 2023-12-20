import React, { useState, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Box, TextField, Button, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Container, Paper, Grid } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';

import registrationSchema from '../Validations/registrationSchema';
import { registrationFormData } from '../Validations/registrationSchema';

const Signup = () => {
    const { handleSubmit, control, formState: { errors } } = useForm<registrationFormData>({
        resolver: yupResolver(registrationSchema)
    });

    const onSubmit = async (data: registrationFormData) => {
        console.log(data);
    };

    return (
        <Container
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
            }}
        >
            <Paper elevation={6} sx={{ p: 4, borderRadius: '16px', width: '40rem' }}>
                <Typography variant="h4" align="center" gutterBottom>
                    Register new account
                </Typography>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
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
                                            fullWidth
                                        />
                                    )}
                                />
                                {errors.username && (
                                    <Typography color="error">{errors.username.message}</Typography>
                                )}
                            </Grid>
                            <Grid item xs={12}>
                                <Controller
                                    control={control}
                                    name="email"
                                    render={({ field: { onChange } }) => (
                                        <TextField
                                            placeholder="Badur@mail.com"
                                            label="Enter your email"
                                            type="email"
                                            onChange={onChange}
                                            variant="outlined"
                                            required
                                            fullWidth
                                        />
                                    )}
                                />
                                {errors.email && (
                                    <Typography color="error">{errors.email.message}</Typography>
                                )}
                            </Grid>
                            <Grid item xs={6}>
                                <Controller
                                    control={control}
                                    name="password"
                                    render={({ field: { onChange } }) => (
                                        <TextField
                                            label="Password"
                                            type="password"
                                            onChange={onChange}
                                            fullWidth
                                        />
                                    )}
                                />
                                {errors.password && (
                                    <Typography sx={{ color: 'red' }}>
                                        {errors.password.message}
                                    </Typography>
                                )}
                            </Grid>
                            <Grid item xs={6}>
                                <Controller
                                    control={control}
                                    name="confirm"
                                    render={({ field: { onChange } }) => (
                                        <TextField
                                            label="Confirm"
                                            type="password"
                                            onChange={onChange}
                                            fullWidth
                                        />
                                    )}
                                />
                                {errors.confirm && (
                                    <Typography sx={{ color: 'red' }}>
                                        {errors.confirm.message}
                                    </Typography>
                                )}
                            </Grid>
                        </Grid>
                        <Button type="submit" variant="contained">
                            Register
                        </Button>
                    </Box>
                </form>
            </Paper>
        </Container>
    )
}

export default Signup;
