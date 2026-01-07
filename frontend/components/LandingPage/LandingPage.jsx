"use client";
import { useRouter } from "next/navigation"

function LandingPage() {
    const router = useRouter();

    return (
        <div id="landingPage" className="main">
            <h1>Welcome to Home Reporting Tool</h1>

            <div id="loginSignupButtons">
                <button onClick={()=> router.push('/login')}>Login</button>
                <button onClick={()=> router.push('/signup')}>Signup</button>
            </div>
        </div>
    )
}

export default LandingPage;