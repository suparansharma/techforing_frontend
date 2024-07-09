import React, { useState, useEffect } from "react"
import AuthUser from "../components/AuthUser";
import toast from "../components/Toast/index";
import { useNavigate } from 'react-router-dom';


export default function Login() {
    const { http, setToken, token } = AuthUser();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
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
            navigate('/');
        }
    }, [token, navigate]);


    return (
        <div className="row justify-content-center pt-5">
            <div className="col-sm-6">
                <div className="card p-4">
                    <h1 className="text-center mb-3">Login </h1>
                    <div className="form-group">
                        <label>Email address:</label>
                        <input type="email" className="form-control" placeholder="Enter email"
                            onChange={e => setEmail(e.target.value)}
                            id="email" />
                    </div>
                    <div className="form-group mt-3">
                        <label>Password:</label>
                        <input type="password" className="form-control" placeholder="Enter password"
                            onChange={e => setPassword(e.target.value)}
                            id="pwd" />
                    </div>
                    <button type="button" onClick={submitForm} className="btn btn-primary mt-4">Login</button>
                </div>
            </div>
        </div>
    )
}