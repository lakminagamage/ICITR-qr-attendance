import React, { useEffect } from 'react';

const Footer = () => {
  useEffect(() => {
    // Add margin-top to the body content
    document.body.style.marginBottom = "2rem";
  }, []);

  return (
    <footer className="bg-blue-900 text-white text-center py-4 fixed bottom-0 w-full">
      <p className="text-sm">
        &copy; 2024 Information Technology Research Unit, Faculty of Information Technology, University of Moratuwa.
      </p>
    </footer>
  );
};

export default Footer;
