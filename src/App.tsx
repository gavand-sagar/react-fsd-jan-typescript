
import { Navigate, Route, Routes } from 'react-router-dom';
import React from 'react';
import './App.css';
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
import Notes from './pages/notes/Notes';
import ProtectedRoute from './shared/components/ProtectedRoute';
import BooksList from './pages/books/BooksList';
import PostList from './pages/posts/PostList';
import Profile from './pages/profile/Profile';

 const App = () => {
  return (
    <>
      <div className="App">
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/profile' element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path='/notes' element={<ProtectedRoute><Notes /></ProtectedRoute>} />
          <Route path='/books-list' element={<ProtectedRoute><BooksList /></ProtectedRoute>} />
          <Route path='/posts-list' element={<ProtectedRoute><PostList /></ProtectedRoute>} />
          <Route path='/' element={<Navigate to={'/login'} />} />
        </Routes>
      </div>
    </>
  );
}

export default App;

