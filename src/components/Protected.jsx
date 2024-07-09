// import React,{useEffect, useState } from 'react'
// import AuthUser from './AuthUser';
// import { useNavigate } from 'react-router-dom';

// const Protected = (props) => {
//     const { token } = AuthUser();
//     const navigate = useNavigate();

//     let Cmp = props.Cmp;
//     useEffect(() => {
//         if (!token) {
//             navigate('/login');
//         }
//     }, [token, navigate]);
//   return (
//     <div>
//         <Cmp/>
//     </div>
//   )
// }

// export default Protected


import { Navigate } from 'react-router-dom';
import AuthUser from './AuthUser';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = false; // Replace this with your authentication logic
  const { token } = AuthUser();
  if (!token) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
