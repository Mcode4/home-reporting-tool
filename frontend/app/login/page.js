"use client";
import { useRouter } from "next/navigation";
import { useState } from 'react';
import { login } from "@/api/session";

import styles from './page.module.css'

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [err, setErr] = useState({});


    const handleSubmit = async (e) => {
        e.preventDefault();
        setErr({});

        try {
            const res = await login(email, password);
            console.log('Login successful');
            router.push('/home');
        } catch(err) {
            if(err.status === 404) {
                setErr({
                    email: "Email doesn't have an account"
                });
            } else if(err.status === 401) {
                setErr({
                    password: "Invalid password"
                });
            }
        }
    }

    return (
        <div className="loginSignupPage">
            <div className="main">
                <h2>Login</h2>

                <form onSubmit={handleSubmit}>
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" value={email} onChange={(e)=> setEmail(e.target.value)} required />
                    {err.email && (<p className="error">{err.email}</p>)}

                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" value={password} onChange={(e)=> setPassword(e.target.value)} required />
                    {err.password && (<p className="error">{err.password}</p>)}

                    <button type="submit">Login</button>

                    <button type="button" onClick={()=> router.push('/')}>Back to Home</button>

                    <p>Need to create an account? <a href="/signup">Sign up here</a></p>
                </form>
            </div>
        </div>
    )
}