import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Import all your pages
import Home from './pages/Home.jsx'; // Dashboard
import Income from './pages/Income.jsx';
import Expense from './pages/Expense.jsx';
import Category from './pages/Category.jsx';
import Filter from './pages/Filter.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';

const RequireAuth = ({ children }) => {
  const token = localStorage.getItem("token");
  
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const ProtectedRoutes = ({ children }) => {
  const token = localStorage.getItem("token");

  if (token) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

const App = () => {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      
      <BrowserRouter>
        <Routes>
          <Route 
            path='/' 
            element={
              localStorage.getItem("token") ? <Navigate to="/dashboard" /> : <Navigate to="/login" />
            } 
          />
          <Route 
            path='/login' 
            element={
              <ProtectedRoutes>
                <Login/>
              </ProtectedRoutes>
            } 
          />
          <Route 
            path='/signup' 
            element={
              <ProtectedRoutes>
                <Signup/>
              </ProtectedRoutes>
            } 
          />

          {/* --- Protected Routes (Must be logged in) --- */}
          <Route 
            path='/dashboard' 
            element={
              <RequireAuth>
                <Home/>
              </RequireAuth>
            } 
          />
          
          <Route 
            path='/incomes' 
            element={
              <RequireAuth>
                <Income/>
              </RequireAuth>
            } 
          />
          
          <Route 
            path='/expenses' 
            element={
              <RequireAuth>
                <Expense/>
              </RequireAuth>
            } 
          />
          
          <Route 
            path='/category' 
            element={
              <RequireAuth>
                <Category/>
              </RequireAuth>
            } 
          />
          
          <Route 
            path='/filter' 
            element={
              <RequireAuth>
                <Filter/>
              </RequireAuth>
            } 
          />

          {/* Fallback Route: If user types random URL, send to 404 or Dashboard */}
          <Route path="*" element={<Navigate to="/" />} />

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;