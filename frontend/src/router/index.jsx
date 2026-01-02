import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";

import AddHousePage from "../components/AddHousePage";
import AssetsMenu from "../components/AssetsMenu";
import CreatorsPage from "../components/CreatorsPage";
import HomePage from "../components/HomePage";
import LandingPage from "../components/LandingPage";


export const router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            {
                index: true,
                element: <LandingPage />
            },
            {
                path: 'home',
                element: <HomePage />
            },
            {
                path: 'add',
                element: <AddHousePage />
            },
            {
                path: 'edit/:id',
                element: <AddHousePage />
            },
            {
                path: 'create/:id',
                element: (
                    <>
                        <CreatorsPage />
                        <AssetsMenu />
                    </>
                )
            },
            {
                path: '*',
                element: <h2>404 Page Not Found</h2>
            }
        ]
    }
])