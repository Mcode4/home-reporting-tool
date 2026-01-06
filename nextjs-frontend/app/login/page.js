"use client";
import { useRouter } from "next/navigation";
import styles from './page.module.css'

export default function LoginPage() {
    const router = useRouter();

    return (
        <div className="loginSignupPage">
            <div className="main">
                <h2>Login</h2>

                <form action="">
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" required />

                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" required />

                    <button type="submit">Login</button>

                    <button type="button" onClick={()=> router.push('/')}>Back to Home</button>

                    <p>Need to create an account? <a href="/signup">Sign up here</a></p>
                </form>
            </div>
        </div>
    )
}