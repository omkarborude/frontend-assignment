import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';

describe('App Component', () => {
  test('renders title', () => {
    render(<App />);
    expect(screen.getByText(/Frontend Assignment/i)).toBeInTheDocument();
  });

  test('displays project data', async () => {
    render(<App />);
    
    // Wait for the data to be fetched and displayed
    await waitFor(() => screen.getByText('186')); // Adjust this based on your actual data
    
    expect(screen.getByText('186')).toBeInTheDocument();
    expect(screen.getByText('15823')).toBeInTheDocument();
  });

  test('Previous button is disabled on first page', async () => {
    render(<App />);
    
    await waitFor(() => screen.getByText('186'));
    
    // Ensure the Previous button is disabled on the first page
    expect(screen.getByText('Previous')).toBeDisabled();
  });
});
