"use client";
import { useRouter } from "next/navigation"

export default function LandingPagePage() {
  const router = useRouter();

    return (
        <div id="landingPage" className="mainHolder">
          <div className="main">
            <h2>Welcome to Home Reporting Tool</h2>

            <p>Login or Create an account to access the tools</p>

            <div id="loginSignupButtons">
              <button onClick={()=> router.push('/login')}>Login</button>
              <button onClick={()=> router.push('/signup')}>Signup</button>
            </div>
          </div>
        </div>
    )
}
