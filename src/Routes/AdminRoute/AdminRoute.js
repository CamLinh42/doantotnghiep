import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider';

const AdminRoute = ({ children }) => {
    const { user, loading, userDb } = useContext(AuthContext);
    const location = useLocation();

    if (user && userDb?.role != 1) {
        return children;
    }

    return <Navigate to='/login' state={{ form: location }} replace></Navigate>
};

export default AdminRoute;