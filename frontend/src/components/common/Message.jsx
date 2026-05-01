import React from 'react';

const variants = {
  error: 'bg-red-50 border-red-400 text-red-700',
  success: 'bg-green-50 border-green-400 text-green-700',
  info: 'bg-blue-50 border-blue-400 text-blue-700',
  warning: 'bg-yellow-50 border-yellow-400 text-yellow-700',
};

const Message = ({ variant = 'info', children }) => (
  <div className={`border-l-4 p-4 rounded-r-lg ${variants[variant]}`} role="alert">
    <p>{children}</p>
  </div>
);

export default Message;
