import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import Footer from "../components/Footer";

export default function Layout() {
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(()=> {
        dispatch() // Make sure all chat data is loaded
    }, [dispatch])

    return (
        <>
            {isLoaded && <Outlet />}
            <Footer />
        </>
    )
}