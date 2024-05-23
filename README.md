# Text to PDF Converter

This is a simple React application that allows users to convert entered text into a PDF document. The application uses React-PDF library for rendering a PDF document, Tailwind CSS for styling and Axios for making HTTP requests to the PDF conversion API.

## Demo
Here is a [video](https://www.loom.com/share/18ede9112d884e7a8c5acdaee62ac162?sid=066b0822-85a1-43d9-a0e1-5ded80dab3f3) with a short demonstration.


## Project Structure

- `src/App.js`: Main component rendering the app title and the PDFConverter.js component.
- `src/PDFConverter.js`: Main component managing text to PDF conversion logic.
- `src/ConversionHistory.js`: Component for displaying conversion history.

## Features

- **Text Input**: Users can enter text to be converted into a PDF.
- **PDF Conversion**: The entered text is sent to a remote API to be converted into a PDF document.
- **PDF Display**: The generated PDF is displayed within the application.
- **Conversion History**: The application saves the history of conversions and displays them.

## Setup

1. Clone the repository.
2. Install dependencies with `npm install`.
3. Start the application with `npm start`.

## Testing

To run the tests, use `npm run test`.

## Usage

1. Enter the text to be converted in the text area.
2. Click the "Convert to PDF" button.
3. The generated PDF will be displayed next to the text input.
4. The conversion history is displayed on the right of the page.
