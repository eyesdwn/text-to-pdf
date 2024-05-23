import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import '@testing-library/jest-dom';
import { PDFConverter } from './PDFConverter';
import { API_URL } from './constants';

jest.mock('axios');

describe('PDFConverter', () => {
  beforeEach(() => {
    localStorage.clear();
  });
  global.URL.createObjectURL = jest.fn();

  test('renders text area and convert button', () => {
    render(<PDFConverter />);

    expect(screen.getByTestId('textInput')).toBeInTheDocument();
    expect(screen.getByTestId('convertButton')).toBeInTheDocument();
  });

  test('converts text to PDF', async () => {
    const mockPdfBlob = new Blob(['fake-pdf-content'], { type: 'application/pdf' });
    const mockResponse = { data: mockPdfBlob };
    axios.post.mockResolvedValueOnce(mockResponse);

    render(<PDFConverter />);

    const textArea = screen.getByTestId('textInput');
    const convertButton = screen.getByTestId('convertButton');

    fireEvent.change(textArea, { target: { value: 'Sample text' } });
    fireEvent.click(convertButton);

    await waitFor(() =>
      expect(axios.post).toHaveBeenCalledWith(API_URL, { text: 'Sample text' }, { responseType: 'blob' })
    );

    expect(screen.getByTestId('pdf')).toBeInTheDocument();
  });

  test('adds converted PDF to history and localStorage', async () => {
    const mockPdfBlob = new Blob(['fake-pdf-content'], { type: 'application/pdf' });
    const mockResponse = { data: mockPdfBlob };
    axios.post.mockResolvedValueOnce(mockResponse);

    render(<PDFConverter />);

    const textArea = screen.getByTestId('textInput');
    const convertButton = screen.getByTestId('convertButton');

    fireEvent.change(textArea, { target: { value: 'Another sample' } });
    fireEvent.click(convertButton);

    await waitFor(() =>
      expect(axios.post).toHaveBeenCalledWith(API_URL, { text: 'Another sample' }, { responseType: 'blob' })
    );

    expect(localStorage.getItem('conversionHistory')).toContain('[{"text":"Another sample"}]');
  });
});
