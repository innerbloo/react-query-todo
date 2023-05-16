import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import axios from 'axios';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';

import { TOKEN } from '@/constants/common';
import { EMAIL, PASSWORD } from '@/constants/name';
import { MAIN_URL, SIGN_UP_URL } from '@/constants/url';
import { useInputs } from '@/hooks/form';
import { LoginData } from '@/interfaces/common';
import { emailValidation } from '@/utils/validation';

function Copyright(props: any) {
    return (
        <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            {...props}
        >
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const theme = createTheme();

export default function Login() {
    const [loginInputStates, handleInput] = useInputs({
        [EMAIL]: '',
        [PASSWORD]: '',
    });

    const [errorStates, setErrorStates] = useState('');

    const isValidatedEmail = emailValidation(loginInputStates[EMAIL]);
    const isValidatedPassword = loginInputStates[PASSWORD].length > 0;

    const navigate = useNavigate();

    const loginMutation = useMutation(
        (data) => {
            return axios.post('http://localhost:8080/users/login', data);
        },
        {
            onMutate: (variable: LoginData) => {
                console.log('onMutate', variable);
            },
            onError: (error: any, variable, context) => {
                setErrorStates(error?.response?.data?.details);
            },
            onSuccess: (data, variables, context) => {
                localStorage.setItem(TOKEN, data?.data.token);
                navigate(MAIN_URL);
            },
        },
    );

    const handleSubmit = () => {
        loginMutation.mutate({
            [EMAIL]: loginInputStates[EMAIL],
            [PASSWORD]: loginInputStates[PASSWORD],
        });
    };

    useEffect(() => {
        setErrorStates('');
    }, [loginInputStates]);

    return (
        <ThemeProvider theme={theme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage:
                            'url(https://images.unsplash.com/photo-1586281380923-93c9b0a7296e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80)',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light'
                                ? t.palette.grey[50]
                                : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Grid
                    item
                    xs={12}
                    sm={8}
                    md={5}
                    component={Paper}
                    elevation={6}
                    square
                >
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Login
                        </Typography>
                        <Box sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                error={!!errorStates}
                                id={EMAIL}
                                label="Email Address"
                                name={EMAIL}
                                autoComplete={EMAIL}
                                autoFocus
                                onChange={handleInput}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                error={!!errorStates}
                                name={PASSWORD}
                                label={PASSWORD}
                                type={PASSWORD}
                                id={PASSWORD}
                                helperText={errorStates}
                                autoComplete="current-password"
                                onChange={handleInput}
                            />
                            <Button
                                fullWidth
                                variant="contained"
                                disabled={
                                    !isValidatedEmail || !isValidatedPassword
                                }
                                onClick={handleSubmit}
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Sign In
                            </Button>
                            <Grid container justifyContent="flex-end">
                                <Grid item>
                                    <Link href={SIGN_UP_URL} variant="body2">
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                </Grid>
                            </Grid>
                            <Copyright sx={{ mt: 5 }} />
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}
