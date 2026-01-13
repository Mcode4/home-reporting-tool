// components/AppLayout.js
"use client";
import { useEffect, useState, createContext, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { getCurrentUser } from "@/api/session";
import Navbar from "../Navbar";
import Footer from "../Footer";

export const UserContext = createContext({
    user: null,
    loading: true,
    setUser: ()=> {},
});

export default function AppLayout({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
    console.log("AppLayout mounted");

    getCurrentUser()
    .then((data) => {
        console.log("User loaded:", data);
        setUser(data);
    })
    .catch((err) => {
        console.log("No user:", err.message);
        setUser(null);
    })
    .finally(() => {
        console.log("Loading finished");
        setLoading(false);
    });
    }, []);

    if (loading) return <div>Loading...</div>;

    return (
    <UserContext.Provider value={{ user, loading, setUser }}>
        <div id="appLayout">
        <Navbar user={user} />
            <main>{children}</main>
        <Footer />
        </div>
    </UserContext.Provider>
    );
}