"use client";
import { useRouter } from "next/navigation";

function LoginSignupPage({ mode }) {
    const router = useRouter();

    return (
        <div className="loginSignupPage">
            <h2>{mode === 'login' ? 'Login' : 'Sign Up'}</h2>

            <form action="">
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" required />

                {mode === "signup" && (
                    <>
                        <label htmlFor="confirm-email">Confirm Email:</label>
                        <input type="email" id="confirm-email" name="confirm-email" required />
                    </>
                )}

                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" required />

                {mode === "signup" && (
                    <>
                        <label htmlFor="confirm-password">Confirm Password:</label>
                        <input type="password" id="confirm-password" name="confirm-password" required />
                    </>
                )}

                <button type="submit">{mode === 'login' ? 'Login' : 'Sign Up'}</button>

                <button onClick={()=> router.push('/home')}>Back to Home</button>
            </form>
        </div>
    )
}

export default LoginSignupPage;