import { useCallback } from 'react';
import { LeftIcon } from './components/LeftIcon';
import { RightIcon } from './components/RightIcon/RightIcon';

export const NavButtons = ({ setPageNumber, numPages, pageNumber }) => {
  const handleChangePage = useCallback(
    (offset) => {
      setPageNumber((prevPageNumber) => prevPageNumber + offset);
    },
    [setPageNumber]
  );

  const handlePrev = useCallback(() => {
    handleChangePage(-1);
  }, [handleChangePage]);

  const handleNext = useCallback(() => {
    handleChangePage(1);
  }, [handleChangePage]);

  const showNavButtons = numPages > 1;

  return (
    <div className='flex items-center absolute bottom-5 left-1/2 z-10 -translate-x-1/2'>
      {showNavButtons && (
        <button className='w-5 h-5' type='button' disabled={pageNumber <= 1} onClick={handlePrev}>
          <LeftIcon />
        </button>
      )}
      <p className='ml-2 mr-2'>
        {pageNumber || (numPages ? 1 : '--')} of {numPages || '--'}
      </p>
      {showNavButtons && (
        <button type='button' disabled={pageNumber >= numPages} onClick={handleNext}>
          <RightIcon />
        </button>
      )}
    </div>
  );
};
