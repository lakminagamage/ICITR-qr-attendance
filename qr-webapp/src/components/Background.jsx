import React from 'react';

const Background = ({ children }) => {
  return (
    <div className="bg-white relative min-h-screen bg-gradient-to-b from-white to-gray-100" style={{ backgroundImage: 'url(./hero_back.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
      {children}
      <img src="./ITRU_Logo.png" alt="Icon" className="absolute bottom-11 left-0 m-4 h-14 w-20" />
    </div>
  );
};

export default Background;