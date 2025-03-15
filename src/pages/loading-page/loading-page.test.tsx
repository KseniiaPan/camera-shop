import { render, screen } from '@testing-library/react';
import LoadingPage from './loading-page';

describe('Component: Loading page', () => {
  it('should render correct', () => {
    const loadingPageTestId = 'loader';

    render(<LoadingPage />);
    const loadingPage = screen.getByTestId(loadingPageTestId);
    expect(loadingPage).toBeInTheDocument();
  });
});
