import { ReactElement } from "react"
import { Navigate, Outlet } from "react-router-dom";

interface ProtectedRouteProps{
    isAuthenticated : boolean;
    redirect ?: string;
    children ?: ReactElement;
}

function ProtectedRoute({ children, isAuthenticated, redirect = "/" } : ProtectedRouteProps) {
    if(!isAuthenticated){
        return <Navigate to={redirect} state={{toastMessage : "Please Login first"}} />
    } 

    return children ? children : <Outlet />
}

export default ProtectedRoute