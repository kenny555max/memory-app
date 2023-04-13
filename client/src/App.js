import React from 'react';
import { CssBaseline, Container } from '@mui/material';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './index.css';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import PostDetails from './components/PostDetails/PostDetails';
import Header from './components/Header/Header';

const App = () => {
  const user = JSON.parse(localStorage.getItem('profile'));
  return (
    <React.Fragment>
      <Router>
        <Container maxWidth='lg'>
          <CssBaseline />
          <Header />
          <Routes>
            <Route path='/' element={<Navigate replace to='/posts' />} />
            <Route path='/posts' element={<Home />} />
            <Route path='/posts/search' element={<Home />} />
            <Route path='/posts/:id/postDetails' element={<PostDetails />} />
            <Route path='/auth' element={user !== null ? <Navigate replace to='/posts' /> : <Auth />} />
          </Routes>
        </Container>
      </Router>
    </React.Fragment>
  )
}

export default App;