import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../context/useUser";

export default function ProtectedRoute() {
    const { user } = useUser()
    if (!user) return <Navigate to="/sign" />
    return <Outlet />
}