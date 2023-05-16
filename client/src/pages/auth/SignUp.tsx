import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Alert, AlertTitle } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
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
import { LOGIN_URL, MAIN_URL } from '@/constants/url';
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

export default function SignUp() {
    const [signUpInputStates, handleInput] = useInputs({
        [EMAIL]: '',
        [PASSWORD]: '',
    });

    const [errorStates, setErrorStates] = useState('');

    const isValidatedEmail = emailValidation(signUpInputStates[EMAIL]);
    const isValidatedPassword = signUpInputStates[PASSWORD].length > 8;

    const navigate = useNavigate();

    const loginMutation = useMutation(
        (data) => {
            return axios.post('http://localhost:8080/users/create', data);
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
            [EMAIL]: signUpInputStates[EMAIL],
            [PASSWORD]: signUpInputStates[PASSWORD],
        });
    };

    useEffect(() => {
        setErrorStates('');
    }, [signUpInputStates]);

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign Up
                    </Typography>
                    <Box sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id={EMAIL}
                                    label="Email Address"
                                    error={!isValidatedEmail}
                                    onChange={handleInput}
                                    name={EMAIL}
                                    autoComplete={EMAIL}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name={PASSWORD}
                                    label={PASSWORD}
                                    error={!isValidatedPassword}
                                    onChange={handleInput}
                                    type={PASSWORD}
                                    id={PASSWORD}
                                    autoComplete="new-password"
                                />
                            </Grid>
                        </Grid>
                        {errorStates && (
                            <Alert severity="error" sx={{ mt: 2 }}>
                                <AlertTitle>Error</AlertTitle>
                                {errorStates}
                            </Alert>
                        )}
                        <Grid container justifyContent="flex-end" gap={1}>
                            <Button
                                variant="outlined"
                                sx={{ mt: 3, mb: 2 }}
                                onClick={() => {
                                    navigate(LOGIN_URL);
                                }}
                            >
                                cancel
                            </Button>
                            <Button
                                disabled={
                                    !isValidatedEmail || !isValidatedPassword
                                }
                                variant="contained"
                                onClick={handleSubmit}
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Sign Up
                            </Button>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 2 }} />
            </Container>
        </ThemeProvider>
    );
}
