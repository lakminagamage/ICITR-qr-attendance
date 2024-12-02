import React from 'react';
import InputText from './InputText';
import { useState, useEffect } from 'react';

const AuthorDetail = () => {
  // const authorData = [
  //   "John", // First Name
  //   "Doe", // Last Name
  //   "john.doe@example.com", // Email Address
  //   "123 Main St", // Address
  //   "34", // Age
  //   "Male", // Sex
  //   "984536920V" // NIC Number
  // ];
  const [authorData, setAuthorData] = useState([]);
  const [imageSrc, setImageSrc] = useState('');

  useEffect(() => {
    const socket = new WebSocket('ws://your-websocket-url');

    socket.onopen = () => {
      console.log('WebSocket connection established');
      socket.send('Requesting author details');
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setAuthorData(data);
      setImageSrc(data.imageSrc);
    };

    socket.onclose = () => {
      console.log('WebSocket connection closed');
    };

    socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    return () => {
      socket.close();
    };
  }, []);

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="grid md:grid-cols-2 gap-8 mt-16">
        <div className="flex justify-center items-center relative">
          <img
            src={imageSrc || './i.png'} // Use dynamic image source or fallback to default
            alt="Author"
            className="rounded-md shadow-lg object-cover"
            style={{ opacity: imageSrc ? 1 : 0.5, width: imageSrc ? 'auto' : '60%', height: imageSrc ? 'auto' : '60%' }} // Reduce opacity and size for default image
          />
          <div className="absolute right-0 top-0 h-full border-r-2 border-gray-300"></div>
        </div>
        <div className="relative">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Author Details</h2>
          <p className="text-sm text-gray-600 mb-6">
            Please confirm if your details below are accurate.
          </p>
          <form>
            <InputText
              label="First Name"
              value={authorData[0]}
              placeholder="First name"
            />
            <InputText
              label="Last Name"
              value={authorData[1]}
              placeholder="Last name"
            />
            <InputText
              label="Email Address"
              value={authorData[2]}
              placeholder="Email address"
            />
            <InputText
              label="Address"
              value={authorData[3]}
              placeholder="Address"
            />
            <div className="grid grid-cols-2 gap-4">
              <InputText
                label="Age"
                value={authorData[4]}
                placeholder="Age"
              />
              <InputText
                label="Sex"
                value={authorData[5]}
                placeholder="Sex"
              />
            </div>
            <InputText
              label="NIC Number"
              value={authorData[6]}
              placeholder="NIC number"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthorDetail;