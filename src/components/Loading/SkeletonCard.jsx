import React from 'react';

const SkeletonCard = ({ theme }) => {
  const base = theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200';
  return (
    <div className={`rounded-xl p-3 border-2 ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
      <div className={`skeleton w-full h-[120px] rounded-lg ${base}`} />
      <div className={`skeleton h-4 w-24 mt-3 rounded ${base}`} />
      <div className={`skeleton h-4 w-full mt-2 rounded ${base}`} />
      <div className={`skeleton h-8 w-full mt-3 rounded ${base}`} />
    </div>
  );
};

export default SkeletonCard;