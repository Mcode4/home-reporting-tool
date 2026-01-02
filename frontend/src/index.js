// import React from "react";
// import ReactDOM from "react-dom/client";
// import { Provider as ReduxProvider } from "react-redux";
// import { RouterProvider } from "react-router-dom";
// import configureStore from "./redux/store";
// import { router } from "./router";
// import * as sessionActions from "./redux/session";
// import "./index.css";

// const store = configureStore();
// const isStrictMode = import.meta.env.VITE_STRICT_MODE === 'true';

// if (import.meta.env.MODE !== "production") {
//   window.store = store;
//   window.sessionActions = sessionActions;
// }

// ReactDOM.createRoot(document.getElementById("root")).render(
//   isStrictMode ? (
// 		<React.StrictMode>
// 			<ReduxProvider store={store}>
//       <RouterProvider router={router} />
//     </ReduxProvider>
// 		</React.StrictMode>
// 	) : (
// 		<ReduxProvider store={store}>
//       <RouterProvider router={router} />
//     </ReduxProvider>
// 	)
// );

import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom'; // import RouterProvider
import { router } from './router';  // import your router

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />  {/* Provide the router to your app */}
  </React.StrictMode>
);