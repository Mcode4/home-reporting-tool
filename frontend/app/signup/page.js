"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { register } from "@/api/session";
import styles from './page.module.css'

export default function SignUpPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [err, setErr] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErr({});

        if(confirmPassword !== password) {
            return setErr({
                password: "Passwords don't match"
            });
        }

        try {
            const res = await register(email, password);
            console.log('Sign up successful');
            router.push('/');
        } catch(err) {
            if(err.status === 400) {
                setErr({
                    email: "Email is in use"
                });
            }
        }
    }

    return (
        <div id="signupPage" className="mainHolder">
            <div className="main">
                <h2>Sign Up</h2>

                <form onSubmit={handleSubmit}>
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" value={email} onChange={(e)=> setEmail(e.target.value)} required />
                    {err.email && (<p className="error"> {err.email} </p>)}

                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" value={password} onChange={(e)=> setPassword(e.target.value)} required />
                    {err.password && (<p className="error"> {err.password} </p>)}

                    <label htmlFor="confirm-password">Confirm Password:</label>
                    <input type="password" id="confirm-password" name="confirm-password" value={confirmPassword} onChange={(e)=> setConfirmPassword(e.target.value)} required />

                    <button type="submit">Sign Up</button>

                    <button type="button" onClick={()=> router.push('/')}>Back to Home</button>

                    <p>Have an account? <a href="/login">Login here</a></p>
                </form>
            </div>
        </div>
    )
}