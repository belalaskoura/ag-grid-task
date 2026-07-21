import {describe, it, expect, vi} from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Home } from './Home';

// Create a mock version of useNavigate
const mockNavigate = vi.fn();

// Mock the react-router-dom
vi.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
}));


describe('Home Component', () => {
  it('renders the Home component with correct content', () => {
    render(<Home />);

    // Check for the presence of the heading
    const headingElement = screen.getByText("Rick and Morty Database");
    expect(headingElement).toBeInTheDocument();
    
    // Check for the presence of the description text
    const descriptionElement = screen.getByText("A minimal tracker for dimensional entities, life status, and origin locations.");
    expect(descriptionElement).toBeInTheDocument();
    
    // Check for the presence of the button
    const buttonElement = screen.getByRole('button', { name: "Explore Characters →" });
    expect(buttonElement).toBeInTheDocument();
  });
})

//Test to check if the button navigates to the correct route when clicked
describe('Navigation Button', () => {
  it('navigates to the character grid page when the button is clicked', () => {
    render(<Home />);
    const buttonElement = screen.getByRole('button', { name: "Explore Characters →" });
    fireEvent.click(buttonElement);
    expect(mockNavigate).toHaveBeenCalledWith('/grid');
  });
});