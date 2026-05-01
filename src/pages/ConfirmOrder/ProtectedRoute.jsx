import React from 'react';
import { Navigate } from 'react-router-dom';
import { useCartStore } from '../../store/useCartStore';

function ProtectedRoute({ children }) {
    const { cartIds } = useCartStore();

    if (Object.keys(cartIds).length !== 0) {
        return children;
    } else {
        return <Navigate to={'/'} replace />;
    }
}

export default ProtectedRoute;
