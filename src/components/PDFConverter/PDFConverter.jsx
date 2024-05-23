import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import { ConversionHistory, NavButtons } from './components';
import { API_URL } from './constants';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

export const PDFConverter = () => {
  const [text, setText] = useState('');
  const [history, setHistory] = useState([]);
  const [pdf, setPdf] = useState(null);
  const [numPages, setNumPages] = useState();
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    const storedHistory = JSON.parse(localStorage.getItem('conversionHistory'));
    if (storedHistory) {
      setHistory(storedHistory);
    }
  }, []);

  const addToHistory = useCallback(
    (pdf) => {
      const newHistory = [...history, pdf];
      setHistory(newHistory);
      localStorage.setItem('conversionHistory', JSON.stringify(newHistory));
    },
    [history]
  );

  const convertToPDF = useCallback(async () => {
    try {
      const response = await axios.post(API_URL, { text }, { responseType: 'blob' });
      const url = URL.createObjectURL(response.data);

      setPdf({ url: url, text: text.substring(0, 15) });
      setText('');
      addToHistory({ url, text: text.substring(0, 15) });
    } catch (error) {
      console.error('Error converting to PDF', error);
    }
  }, [text, addToHistory]);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setPageNumber(1);
  };

  return (
    <div className='mb-4 w-full flex justify-between'>
      <div className='flex flex-col w-2/5'>
        <h2 className='text-xl font-bold mb-2 mt-2 text-white'>Enter your text here</h2>
        <textarea
          className='p-2 border rounded mb-2 text-black min-w-full h-[792px]'
          value={text}
          placeholder='Type here...'
          onChange={(e) => setText(e.target.value)}
        />
        <button className='w-fit bg-blue-500 text-white py-2 px-4 rounded' onClick={convertToPDF}>
          Convert to PDF
        </button>
      </div>

      {pdf && (
        <div className='w-2/5'>
          <h2 className='text-xl font-bold mb-2 mt-2 text-white'>Here is your PDF</h2>
          <div className='relative'>
            <Document onLoadSuccess={onDocumentLoadSuccess} file={pdf}>
              <Page pageNumber={pageNumber} />
            </Document>
            <NavButtons setPageNumber={setPageNumber} numPages={numPages} pageNumber={pageNumber} />
          </div>
        </div>
      )}
      <ConversionHistory history={history} setPdf={setPdf} />
    </div>
  );
};
