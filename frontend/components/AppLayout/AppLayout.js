// components/AppLayout.js
"use client";
import { useEffect, useState, createContext, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
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
    const loginRoutes = useRef(new Set(['', '/', 'login', 'signup']));
    const pathname = usePathname();
    const router = useRouter();

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

    useEffect(()=> {
        let pageName
        pathname === '/' ? pageName = '' : pageName = pathname ? pathname.split('/').filter(Boolean)[0] : null;
        console.log('pageName:', pageName);
        
        if(user) {
            if(loginRoutes.current.has(pageName)) router.push('/home');
        } else {
            if(!loginRoutes.current.has(pageName)) router.push('/');
        }
    }, [user, pathname]);

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