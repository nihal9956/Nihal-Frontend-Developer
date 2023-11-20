// File: Banner.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Banner from '../LandingPage/component/Banner';

describe('Banner Component', () => {
    it('renders the component with the correct text and button', () => {
        render(<Banner />);

        // Assert that the text "SpaceAge" is present
        expect(screen.getByText('SpaceAge')).toBeInTheDocument();

        // Assert that the text "NextGen Space organization" is present
        expect(screen.getByText('NextGen Space organization')).toBeInTheDocument();

        // Assert that the "Learn More" button is present
        expect(screen.getByText('Learn More')).toBeInTheDocument();
    });

    it('renders the component with the correct background image', () => {
        render(<Banner />);

        // Assert that the background image is present
        const backgroundImage = screen.getByRole('img');
        expect(backgroundImage).toBeInTheDocument();
        expect(backgroundImage).toHaveAttribute(
            'src',
            'https://sxcontent9668.azureedge.us/cms-assets/assets/Trans_9_7747_SW_Hill_Horiz_Desktop_75241caad0.jpg'
        );
    });

    it('handles button click', () => {
        // Mock function for the button click handler
        const mockLearnMoreHandler = jest.fn();

        render(<Banner onLearnMoreClick={mockLearnMoreHandler} />);

        // Simulate clicking the "Learn More" button
        fireEvent.click(screen.getByText('Learn More'));
    });
});
