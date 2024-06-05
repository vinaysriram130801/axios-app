import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import axios from 'axios';
import CrudEmp1 from './CrudEmp';
test('Enter Branch Details', () => {
    render(<CrudEmp1 />);
    const linkElement = screen.getByText(/CRUD using Axios/i);
    expect(linkElement).toBeInTheDocument();
  });
 
  test('renders correctly', () => {
    const { getByText, getByPlaceholderText } = render(<CrudEmp1 />);
    expect(getByText('CRUD using Axios')).toBeInTheDocument();
    expect(getByText('Branch List')).toBeInTheDocument();
    expect(getByPlaceholderText('Name')).toBeInTheDocument();
    expect(getByPlaceholderText('Location')).toBeInTheDocument();
    expect(getByPlaceholderText('Contact')).toBeInTheDocument();
    expect(getByText('Create Branch')).toBeInTheDocument();
  });
 
  test('validates form fields', async () => {
    const { getByText } = render(<CrudEmp1 />);
    fireEvent.click(getByText('Create Branch'));
    await waitFor(() => {
      expect(getByText('Name is required')).toBeInTheDocument();
      expect(getByText('Location is required')).toBeInTheDocument();
      expect(getByText('Contact is required')).toBeInTheDocument();
    });
  });