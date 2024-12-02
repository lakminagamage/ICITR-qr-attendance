import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Background from '../components/Background';
import AuthorDetail from '../components/AuthorDetail';

const AuthorDetailPage = () => {
  return (
    <div className="min-h-screen">
      <Background>
        <Navbar />
        <AuthorDetail />
        <Footer />
      </Background>
    </div>
  );
};

export default AuthorDetailPage;
