import { render, screen } from '@testing-library/react';
import ScrollUpButton from './scroll-up-button';

describe('Component: ScrollUpButton', () => {
  it('should render correctly', () => {
    const mockHandleClick = vi.fn();

    render(
      <ScrollUpButton
        onScrollUpButtonClick={mockHandleClick}
      />,
    );

    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeEnabled();
    expect(screen.getByRole('button')).toHaveClass('up-btn');
  });
});
