import React from 'react';

const Loader = ({ size = 'md' }) => {
  const sizes = { sm: 'h-6 w-6', md: 'h-10 w-10', lg: 'h-16 w-16' };
  return (
    <div className="flex justify-center items-center py-8">
      <div className={`${sizes[size]} animate-spin rounded-full border-4 border-gray-200 border-t-accent`} />
    </div>
  );
};

export default Loader;
