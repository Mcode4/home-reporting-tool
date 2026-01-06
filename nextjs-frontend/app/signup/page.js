"use client";
import { useRouter } from "next/navigation";
import styles from './page.module.css'

export default function SignUpPage() {
    const router = useRouter();

    return (
        <div className="loginSignupPage">
            <div className="main">
                <h2>Sign Up</h2>

                <form action="">
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" required />

                    <label htmlFor="confirm-email">Confirm Email:</label>
                            <input type="email" id="confirm-email" name="confirm-email" required />

                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" required />

                    <label htmlFor="confirm-password">Confirm Password:</label>
                            <input type="password" id="confirm-password" name="confirm-password" required />

                    <button type="submit">Sign Up</button>

                    <button type="button" onClick={()=> router.push('/')}>Back to Home</button>

                    <p>Have an account? <a href="/login">Login here</a></p>
                </form>
            </div>
        </div>
    )
}