import React from 'react';

export const ConversionHistory = ({ history, setPdf }) => (
  <div className='w-0.1 text-right'>
    <h2 className='text-xl font-bold mb-2 mt-2 text-white'>File History</h2>
    <ul>
      {history.map((item, index) => (
        <li key={index} className='mb-2'>
          <button onClick={() => setPdf(item)} className='text-blue-500 underline'>
            {item?.text}...
          </button>
        </li>
      ))}
      {history.length === 0 && <p className='text-white'>No files yet</p>}
    </ul>
  </div>
);
