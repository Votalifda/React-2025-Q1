import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import ErrorBoundary from './../ErrorBoundary';

describe('ErrorBoundary', () => {
    it('should render children when there is no error', () => {
        render(
            <ErrorBoundary>
                <div>Normal Content</div>
            </ErrorBoundary>
        );

        expect(screen.getByText('Normal Content')).toBeInTheDocument();
    });

    it('should render error message when there is an error', () => {
        const ThrowError = () => {
            throw new Error('Test error');
        };

        render(
            <ErrorBoundary>
                <ThrowError />
            </ErrorBoundary>
        );

        expect(screen.getByText('Something went wrong in the ThrowError component.')).toBeInTheDocument();
    });

    it('should call componentDidCatch and log the error', () => {
        const spy = vi.spyOn(console, 'error').mockImplementation(() => {});

        const ThrowError = () => {
            throw new Error('Test error');
        };

        render(
            <ErrorBoundary>
                <ThrowError />
            </ErrorBoundary>
        );

        expect(spy).toHaveBeenCalledWith('Uncaught error:', expect.any(Error), expect.any(Object));
        spy.mockRestore();
    });
});
