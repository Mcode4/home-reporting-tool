import { useContext } from "react";
import { UserContext } from "../AppLayout/AppLayout";

function Navbar() {
    const { user, loading } = useContext(UserContext);

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
                </div>
            )}
        </div>
    )
}

export default Navbar;