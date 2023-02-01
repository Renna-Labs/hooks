import React, { useRef } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { useOnClickOutside } from '../src/useOnClickOutside';

interface TargetProps {
  handler: () => void;
}

const Target: React.FunctionComponent<TargetProps> = ({ handler }) => {
  const ref = useRef();
  useOnClickOutside(ref, handler);
  // @ts-ignore
  return <div data-testid="target" ref={ref} />;
};

describe('useOnClickOutside', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  it('calls `handler` function when clicked outside target', async () => {
    const handler = jest.fn();

    render(
      <>
        <Target handler={handler} />
        <div data-testid="outside-target" />
      </>,
    );

    const target = screen.getByTestId('target');
    const outsideTarget = screen.getByTestId('outside-target');

    expect(handler).toHaveBeenCalledTimes(0);

    await userEvent.click(target);
    expect(handler).toHaveBeenCalledTimes(0);

    await userEvent.click(outsideTarget);
    expect(handler).toHaveBeenCalledTimes(1);

    await userEvent.click(outsideTarget);
    expect(handler).toHaveBeenCalledTimes(2);

    await userEvent.click(target);
    expect(handler).toHaveBeenCalledTimes(2);
  });
});
