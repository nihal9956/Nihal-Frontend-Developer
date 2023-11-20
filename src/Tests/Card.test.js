import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Card from '../LandingPage/component/Card';

// jest.mock('../../DataRequest.js', () => ({
//     __esModule: true,
//     default: jest.fn(() => Promise.resolve([])),
// }));

describe('Card Component', () => {
    it('renders the component with no result message', async () => {
        render(<Card searchedData={[]} noResult={true} />);

        // Wait for the "No Result Found" message to appear
        await waitFor(() => {
            expect(screen.getByText('No Result Found.')).toBeInTheDocument();
        });

        // Assert that other elements are not present when there are no results
        expect(screen.queryByText('Type 1')).not.toBeInTheDocument();
        expect(screen.queryByText('Details 1')).not.toBeInTheDocument();
    });

    it('renders the component with search results', async () => {
        const mockData = [
            { capsule_serial: '1', type: 'Type 1', details: 'Details 1', original_launch: '2023-01-01T12:00:00Z', status: 'active' },
            { capsule_serial: '2', type: 'Type 2', details: 'Details 2', original_launch: '2023-01-02T12:00:00Z', status: 'unknown' },
        ];

        render(<Card searchedData={mockData} noResult={false} />);

        // Assert that the rendered component contains the expected elements based on mockData
        expect(screen.getByText('Type 1')).toBeInTheDocument();
        expect(screen.getByText('Details 1')).toBeInTheDocument();
        expect(screen.getByText('Type 2')).toBeInTheDocument();
        expect(screen.getByText('Details 2')).toBeInTheDocument();

        // Assert that "No Result Found" message is not present
        expect(screen.queryByText('No Result Found.')).not.toBeInTheDocument();
    });
});
