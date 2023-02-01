import React from 'react';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';

import { useHover } from '../src/useHover';

const Target: React.FunctionComponent<any> = () => {
  const { ref, hovered } = useHover();

  return (
    <div data-testid="target" ref={ref}>
      {hovered ? 'true' : 'false'}
    </div>
  );
};

describe('useHover', () => {
  it('changes `hovered` on mouseenter/mouseleave correctly', () => {
    render(<Target />);
    const target = screen.getByTestId('target');

    expect(target).toHaveTextContent('false');

    fireEvent.mouseEnter(target);
    expect(target).toHaveTextContent('true');

    fireEvent.mouseLeave(target);
    expect(target).toHaveTextContent('false');
  });
});
