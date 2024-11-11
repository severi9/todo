import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Home from './screens/Home';
import Authentication, { AuthenticationMode } from './screens/Authentication.js'
import ErrorPage from './screens/ErrorPage.js'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import UserProvider from './context/UserProvider.js';
import ProtectedRoute from './components/ProtectedRoute.js'

const router = createBrowserRouter ([
  {
    errorElement: <ErrorPage></ErrorPage>
  },
  {
    path: '/sign',
    element: <Authentication AuthenticationMode={AuthenticationMode.Login}></Authentication>,
  },
  {
    path: '/signup',
    element: <Authentication AuthenticationMode={AuthenticationMode.Register}></Authentication>,
  },
  {
    element: <ProtectedRoute/>,
    children: [
      {
        path: '/',
        element: <Home/>,
      }
    ]
  }
])
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserProvider>
      <RouterProvider router={router}></RouterProvider>
    </UserProvider>
  </React.StrictMode>
);

