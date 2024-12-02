import React from 'react';
import Image from "next/image";

export default function NavBar({ setClientID }) {
  return (
    <nav className="fixed pt-5 pb-5 inset-x-0 top-0 z-50 bg-blue-100 bg-opacity-80 backdrop-filter backdrop-blur-sm shadow-md shadow-blur-xl shadow-gray-300">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-start absolute left-0 pl-10">
          <Image
            src="/logo.png"
            alt="ICITR 2024 Logo"
            width={80}
            height={80}
            className="w-20 h-12 object-contain"
          />
        </div>
        <div className="text-right w-full">
          <h1 className="text-xl font-bold text-gray-950 right-0">
            International Conference on Information Technology Research - 2024
          </h1>
        </div>
        <select
          className="ms-6 ml-auto border border-blue-500 rounded-md p-2 text-gray-800 hover:text-black hover:border-gray-300"
          onChange={(e) => setClientID(e.target.value)}
        >
          <option value="5bf8fed6-8e92-4618-9bba-1603e5dc736e">Client 1</option>
          <option value="7ddf697b-732a-4a25-b74f-a4d5f482ef10">Client 2</option>
          <option value="66d71bd5-9adc-4c53-bc84-0527caf29dfb">Client 3</option>
        </select>
      </div>
    </nav>
  );
}