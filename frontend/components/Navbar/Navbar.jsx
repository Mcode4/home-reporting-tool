"use client";
import { useContext } from "react";
import { UserContext } from "../AppLayout/AppLayout";
import { logoutUser } from "@/api/session";
import { useRouter } from "next/navigation";

function Navbar() {
    const { user, loading } = useContext(UserContext);
    const router = useRouter();

    const handleLogout = async (e) => {
        e.preventDefault();
        if(!user) {
            console.error('No user logged in');
        }

        try {
            const res = await logoutUser();
            window.location.reload();
        } catch (e) {
            console.error("error:", e)
        }
    }

    return (
        <div id="navbar">
            <a href="/"><h1>Home Reporting Tool</h1></a>

            {!loading && !user ? (
                <div className="right-nav">
                    <a href="/login">Login</a>
                    <a href="/signup">Sign up</a>
                </div>
            ) : (
                <div className="right-nav">
                    <span>{user.email}</span>
                    <a href="/profile">Profile</a>
                    <button onClick={handleLogout}>logout</button>
                </div>
            )}
        </div>
    )
}

export default Navbar;