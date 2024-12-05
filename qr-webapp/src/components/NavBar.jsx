import React from 'react';
import Image from "next/image";

export default function NavBar({ setClientID }) {
  return (
    <nav className="fixed pt-5 pb-5 inset-x-0 top-0 z-50 bg-blue-100 bg-opacity-80 backdrop-filter backdrop-blur-sm shadow-md shadow-blur-xl shadow-gray-300">
      <div className="container mx-auto flex flex-wrap justify-between items-center">
        <div className="flex items-start pl-4 sm:pl-4">
          <Image
            src="/logo.png"
            alt="ICITR 2024 Logo"
            width={120}
            height={120}
            className="w-full h-20"
          />
        </div>
        <div className="flex items-center justify-end w-full sm:w-auto">
          <h1 className="text-3xl font-bold text-blue-900">
            International Conference on Information Technology Research - 2024
          </h1>
          <select
            className="border border-blue-100 rounded-md p-2 bg-blue-100 hover:text-black hover:border-gray-300"
            onChange={(e) => setClientID(e.target.value)}
          >
            <option value="5bf8fed6-8e92-4618-9bba-1603e5dc736e">Client 1</option>
            <option value="7ddf697b-732a-4a25-b74f-a4d5f482ef10">Client 2</option>
            <option value="66d71bd5-9adc-4c53-bc84-0527caf29dfb">Client 3</option>
          </select>
        </div>
      </div>
    </nav>
  );
}
