import { Route, Routes } from 'react-router-dom'
import React from 'react'
import Login from './views/pages/login/Login'
import DefaultLayout from './layout/DefaultLayout'
import ProtectedRoutes from './ProtectedRoutes'
import Register from './views/pages/register/Register'

const Views = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<ProtectedRoutes />}>
        <Route path="*" name="/" element={<DefaultLayout />} />
      </Route>
    </Routes>
  )
}

export default Views
