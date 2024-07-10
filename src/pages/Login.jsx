import React, { useState, useEffect } from "react";
import AuthUser from "../components/AuthUser";
import toast from "../components/Toast/index";
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, Typography, TextField, Button, Grid, CircularProgress, Box } from "@mui/material";

const Login = () => {
    const { http, setToken, token } = AuthUser();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const notify = React.useCallback((type, message) => {
        toast({ type, message });
    }, []);

    const submitForm = async () => {
        try {
            const res = await http.post('/login', { email: email, password: password });
            if (res?.status === 200) {
                notify("success", "Successfully logged in");
                setToken(res.data.user, res.data.access_token);
            } else {
                notify("error", "Something went wrong");
            }
        } catch (error) {
            notify("error", "Something went wrong: " + error.message);
        }
    }

    useEffect(() => {
        if (token) {
            window.location.reload();
            navigate('/jobmanage');
        }
    }, [token, navigate]);



    return (
        <Grid container justifyContent="center" alignItems="center" style={{ height: '20vh' }}>
            <Grid item xs={12} sm={6}>
                <Card elevation={3}>
                    <CardContent>
                        <Typography variant="h4" align="center" gutterBottom>Login</Typography>
                        <Box sx={{ marginBottom: 2 }}>
                            <TextField
                                fullWidth
                                id="email"
                                label="Email address"
                                variant="outlined"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Box>
                        <Box sx={{ marginBottom: 2 }}>
                            <TextField
                                fullWidth
                                id="password"
                                label="Password"
                                type="password"
                                variant="outlined"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Box>
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={submitForm}
                            sx={{ marginTop: 2 }}
                        >
                            Login
                        </Button>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
}

export default Login;
