import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './index.css'
import User from './components/User'
import Navbar from './components/Navbar'
import UserRegister from './components/User/UserRegister'
import UserLogin from './components/User/UserLogin';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setCredentials } from './features/auth/authSlice';
import Header from './components/partials/header';
import { useGetCategoryQuery } from './store/apis/blogApi';
import CreateBlog from './components/blog/createBlog';
import GetBlog from './components/blog/getBlog';
import BlogDetail from './components/blog/BlogDetail';
import Profile from './components/User/Profile';
import NewPage from './components/blog/NewPage';
import HomePage from './components/HomePage';
import ProfileEdit from './components/User/ProfileEdit';
import Footer from './components/partials/footer';
import fetchUser from './components/admin/fetchUser';
import FetchUser from './components/admin/fetchUser';
import ComplaintForm from './components/Complaint/ComplaintForm';
import AdminReports from './components/admin/adminReports';

function App() {
  const dispatch = useDispatch();


  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');

    if (user && token) {
      // Redux store'a user ve token'ı yükle
      dispatch(setCredentials({ user, token }));
    }
  }, [dispatch]);

  // const { data: categories, error, isLoading } = useGetCategoryQuery();
  // if (isLoading) return <div>Loading categories...</div>;
  // if (error) return <div>Error fetching categories</div>;


  return (
    <>
      {/* <Navbar /> */}
      {/* <Header /> */}
      {/* <GetBlog/> */}
      {/* <div>
        <h1>Categories</h1>
        <ul>
          {categories?.map((category) => (
            <li key={category._id}>{category.name}</li> // Kategorilerin ismini listeliyoruz
          ))}
        </ul>
      </div> */}
      <Router>  {/* Burada Router'ı tanımlıyoruz */}
        <Navbar />  {/* Navbar component'ı Router içinde olacak */}
        <Routes>
          <Route path="/register" element={<UserRegister />} />
          <Route path="/login" element={<UserLogin />} />
          <Route path="/blog-add" element={<CreateBlog />} />
          <Route path="/blog/:id" element={<BlogDetail />} />
          <Route path="/user/:id" element={<Profile />} />
          <Route path='/blogs' element={<NewPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path='/profile/edit/:id' element={<ProfileEdit />} />
          <Route path='/admin/users' element={<FetchUser />} />
          <Route path='/admin/reports' element={<AdminReports />} />
          <Route path='/sikayet' element={<ComplaintForm />} />
        </Routes>
      </Router>

      <Footer />

    </>
  )
}

export default App
