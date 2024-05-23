import React from 'react';
import { PDFConverter } from './components/';

function App() {
  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-2xl text-center text-white font-bold mb-4'>Text to PDF Converter</h1>
      <div className='flex'>
        <PDFConverter />
      </div>
    </div>
  );
}

export default App;
