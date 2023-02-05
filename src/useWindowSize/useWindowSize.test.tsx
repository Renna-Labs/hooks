import { render, fireEvent } from '@testing-library/react';

import { useWindowSize } from './useWindowSize';

function Target() {
  const { width, height } = useWindowSize();
  return (
    <div>
      <h1 data-testid="target">window dimensions are {`${width} x ${height}`}</h1>
    </div>
  );
}

describe('useWindowSize()', () => {
  it('returns correct initial dimensions', () => {
    // custom window dimensions
    window.innerWidth = 2000;
    window.innerHeight = 1000;

    const { getByTestId } = render(<Target />);

    expect(getByTestId('target')).toHaveTextContent('window dimensions are 2000 x 1000');
  });

  it('returns correct dimension after resize', () => {
    // custom window dimensions
    window.innerWidth = 2000;
    window.innerHeight = 1000;

    const { getByTestId } = render(<Target />);

    // updated window dimensions
    window.innerWidth = 1000;
    window.innerHeight = 500;

    fireEvent(window, new Event('resize'));

    expect(getByTestId('target')).toHaveTextContent('window dimensions are 1000 x 500');
  });

  it('returns correct dimension after orientation change', () => {
    // custom window dimensions
    window.innerWidth = 2000;
    window.innerHeight = 1000;

    const { getByTestId } = render(<Target />);

    // updated window dimensions
    window.innerWidth = 6000;
    window.innerHeight = 420;

    fireEvent(window, new Event('orientationchange'));

    expect(getByTestId('target')).toHaveTextContent('window dimensions are 6000 x 420');
  });
});
