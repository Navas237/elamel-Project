import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { cartcontext } from '../../context/CartCotext';


function ProtectedRoute({ children }) {
    const { cartIds } = useContext(cartcontext);

    if (Object.keys(cartIds).length !== 0) {
        return children;
    } else {
        return <Navigate to={'/'} replace />;
    }
}

export default ProtectedRoute;
