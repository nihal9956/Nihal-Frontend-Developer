import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import SearchForm from '../LandingPage/component/SearchForm';


describe('SearchForm Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('handles search button click', async () => {
        render(<SearchForm />);
        // Simulate user input
        userEvent.type(screen.getByLabelText('Status'), 'active');
        userEvent.type(screen.getByLabelText('Original Launch'), '2022-01-01');
        userEvent.type(screen.getByLabelText('Type'), 'Crew Dragon');

        // Simulate clicking the search button
        fireEvent.click(screen.getByText('Search'));
    });
});
