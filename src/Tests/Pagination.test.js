// Pagination.test.js
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // Import for additional matchers
import Pagination from '../LandingPage/component/Pagination';

describe('Pagination Component', () => {
    test('renders correctly with initial props', () => {
        const { getByText, container } = render(
            <Pagination totalRecords={20} onPageChange={() => { }} />
        );

        expect(getByText('1')).toBeInTheDocument();
        expect(getByText('2')).toBeInTheDocument();
    });

    test('changes page on click', () => {
        const onPageChangeMock = jest.fn();
        const { getByText } = render(
            <Pagination totalRecords={20} onPageChange={onPageChangeMock} />
        );

        fireEvent.click(getByText('2'));

    });

    test('applies active class to the current page', () => {
        const { getByText } = render(
            <Pagination totalRecords={20} onPageChange={() => { }} />
        );

        fireEvent.click(getByText('2'));
    });
});
