import React, { useContext, useEffect, useState } from 'react'
// import { loginContext } from '../../Context/LoginSupbase'
import { Navigate } from 'react-router-dom'
import { cartcontext } from '../../context/CartCotext'

function ProtuctedRoute({ children }) {

  const { cartIds } = useContext(cartcontext)



  console.log(Object.keys(cartIds).length);





  if (Object.keys(cartIds).length !== 0) {

    return children
  } else {
    return <Navigate to={'/'} />
  }
}

export default ProtuctedRoute