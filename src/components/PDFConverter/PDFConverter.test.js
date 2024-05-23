import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import { PDFConverter } from './PDFConverter';
import { API_URL } from './constants';

jest.mock('axios');

describe('PDFConverter', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('renders text area and convert button', () => {
    render(<PDFConverter />);

    expect(screen.getByPlaceholderText('Type here...')).toBeInTheDocument();
    expect(screen.getByText('Convert to PDF')).toBeInTheDocument();
  });

  test('converts text to PDF', async () => {
    const mockPdfBlob = new Blob(['fake-pdf-content'], { type: 'application/pdf' });
    const mockResponse = { data: mockPdfBlob };
    axios.post.mockResolvedValueOnce(mockResponse);

    render(<PDFConverter />);

    const textArea = screen.getByPlaceholderText('Type here...');
    const convertButton = screen.getByText('Convert to PDF');

    fireEvent.change(textArea, { target: { value: 'Sample text' } });
    fireEvent.click(convertButton);

    await waitFor(() =>
      expect(axios.post).toHaveBeenCalledWith(API_URL, { text: 'Sample text' }, { responseType: 'blob' })
    );

    expect(screen.getByText('Here is your PDF')).toBeInTheDocument();
  });

  test('loads conversion history from localStorage', () => {
    const storedHistory = [{ url: 'http://example.com/fake.pdf', text: 'Sample text' }];
    localStorage.setItem('conversionHistory', JSON.stringify(storedHistory));

    render(<PDFConverter />);

    expect(screen.getByText('Sample text')).toBeInTheDocument();
  });

  test('adds converted PDF to history and localStorage', async () => {
    const mockPdfBlob = new Blob(['fake-pdf-content'], { type: 'application/pdf' });
    const mockResponse = { data: mockPdfBlob };
    axios.post.mockResolvedValueOnce(mockResponse);

    render(<PDFConverter />);

    const textArea = screen.getByPlaceholderText('Type here...');
    const convertButton = screen.getByText('Convert to PDF');

    fireEvent.change(textArea, { target: { value: 'Another sample text' } });
    fireEvent.click(convertButton);

    await waitFor(() =>
      expect(axios.post).toHaveBeenCalledWith(API_URL, { text: 'Another sample text' }, { responseType: 'blob' })
    );

    expect(localStorage.getItem('conversionHistory')).toContain('Another sample text');
  });

  test('navigates PDF pages', async () => {
    const mockPdfBlob = new Blob(['fake-pdf-content'], { type: 'application/pdf' });
    const mockResponse = { data: mockPdfBlob };
    axios.post.mockResolvedValueOnce(mockResponse);

    render(<PDFConverter />);

    const textArea = screen.getByPlaceholderText('Type here...');
    const convertButton = screen.getByText('Convert to PDF');

    fireEvent.change(textArea, { target: { value: 'Sample text for pagination' } });
    fireEvent.click(convertButton);

    await waitFor(() =>
      expect(axios.post).toHaveBeenCalledWith(API_URL, { text: 'Sample text for pagination' }, { responseType: 'blob' })
    );

    const nextButton = screen.getByRole('button', { name: /righticon/i });
    fireEvent.click(nextButton);

    await screen.findByText('2 of');
  });
});
