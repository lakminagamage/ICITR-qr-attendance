import React from 'react';

const InputText = ({ label, value, placeholder }) => {
  return (
    <div className="mb-2">
      <label className="block text-sm font-medium leading-6 text-gray-900">{label}</label>
      <div className="mt-2">
        <div className="block w-full rounded-md py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 bg-gray-100 sm:text-sm sm:leading-6 ps-2">
          {value || <span className="text-gray-500">{placeholder}</span>}
        </div>
      </div>
    </div>
  );
};

export default InputText;
