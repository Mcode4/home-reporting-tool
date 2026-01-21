"use client";
import { useRouter } from "next/navigation";
import { useState, useContext } from 'react';
import { login } from "@/api/session";
import { UserContext } from "@/components/AppLayout/AppLayout";

import styles from './page.module.css'

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [err, setErr] = useState({});
    const { setUser } = useContext(UserContext);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setErr({});
        console.log('Submit in progress')
        try {
            const user = await login(email, password);
            setUser(user);
            console.log('Login successful');
            router.push('/home');
        } catch(err) {
            console.log("Login error: ", err);
            if(err.status === 404) {
                setErr({
                    email: "Email doesn't have an account"
                });
            } else if(err.status === 401) {
                setErr({
                    account: "Invalid password"
                });
            }
        }
    }

    return (
        <div id="loginPage" className="mainHolder">
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