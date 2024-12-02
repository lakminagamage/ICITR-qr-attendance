import React from 'react';

const Navbar = () => {
  return (
    <nav className="fixed pt-5 pb-5 inset-x-0 top-0 z-50 bg-blue-100 bg-opacity-80 backdrop-filter backdrop-blur-sm shadow-md shadow-blur-xl shadow-gray-300">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-start absolute left-0 pl-10">
            <img src="./logo.png" alt="Logo" className="w-20 h-12" />
        </div>
        <div className="text-right w-full">
          <h1 className="text-xl font-bold text-gray-950 right-0">
            International Conference on Information Technology Research - 2024
          </h1>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
