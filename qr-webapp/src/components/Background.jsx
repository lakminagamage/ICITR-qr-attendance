import React from 'react';

const Background = ({ children }) => {
  return (
    <div className="bg-white relative min-h-screen bg-gradient-to-b from-white to-gray-100" style={{ backgroundImage: 'url(./hero_back.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
      {children}
    </div>
  );
};

export default Background;