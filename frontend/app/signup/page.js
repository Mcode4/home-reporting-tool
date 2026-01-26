"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { register } from "@/api/session";
import useToast from "@/components/Toast/useToast";
import styles from './page.module.css'

export default function SignUpPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [err, setErr] = useState({});
    const { addToast } = useToast();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErr({});
        const SYMBOL = "!@#$%?.-";
        const ALLOWED = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789${SYMBOL}`;

        // if(password.length < 6 || password.length > 25) {
        //     return setErr({
        //         password: "Password must be 6-25 characters"
        //     });
        // }

        if(confirmPassword !== password) {
            return setErr({
                password: "Passwords don't match"
            });
        }

        let symbolCheck = false;
        let upperCaseCheck = false;
        let numberCheck = false;

        for(let i=0; i<password.length; i++) {
            if(!ALLOWED.includes(password[i])) {
                console.log('NOT ALLOWED: ', password[i])
                return setErr({
                    password: "Password contains characters not allowed. Only A-Z, 0-9, and !@#$%?.-"
                });
            }
            if(isFinite(Number(password[i]))) numberCheck = true;
            if("ABCDEFGHIJKLMNOPQRSTUVWXYZ".includes(password[i])) {
                console.log(`${password[i]} passed uppercased check`);
                upperCaseCheck = true;
            }
            if(SYMBOL.includes(password[i])) symbolCheck = true;
        }


        if(!symbolCheck || !upperCaseCheck || !numberCheck) {
                return setErr({
                    password: `Password must contain at least 1 uppercased character, 1 number and 1 special character: ${SYMBOL}`
                });
        }

        try {
            const res = await register(email, password);
            console.log('Sign up successful');
            
            if(res) {
                addToast("Sign up successful 🎉", "success");
                router.push('/');
            }
        } catch(err) {
            if(err.status === 400) {
                setErr({
                    email: "Email is in use"
                });
            } else {
                if(err.message) {
                    setErr({
                        error: err.message
                    })
                } else {
                    setErr({
                        error: "Server error, please try again."
                    })
                }
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

                    <label htmlFor="confirm-password">Confirm Password:</label>
                    <input type="password" id="confirm-password" name="confirm-password" value={confirmPassword} onChange={(e)=> setConfirmPassword(e.target.value)} required />
                    {err.password && (<p className="error"> {err.password} </p>)}
                    {err.error && (<p>{err.error}</p>)}

                    <button type="submit">Sign Up</button>

                    <button type="button" onClick={()=> router.push('/')}>Back to Home</button>

                    <p>Have an account? <a href="/login">Login here</a></p>
                </form>
            </div>
        </div>
    )
}