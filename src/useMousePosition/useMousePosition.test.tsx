import { renderHook, fireEvent, render, screen } from '@testing-library/react';

import { useMousePosition } from './useMousePosition';

const Target: React.FunctionComponent<any> = () => {
  const { ref, x, y } = useMousePosition();

  return (
    <div data-testid="target" ref={ref}>
      {`{ x: ${x}, y: ${y} }`}
    </div>
  );
};

describe('useMousePosition', () => {
  test('initial position is (0, 0)', () => {
    const { result } = renderHook(() => useMousePosition());

    expect(result.current).toEqual({ ref: expect.any(Object), x: 0, y: 0 });
  });

  test('mouse move updates the position', () => {
    render(<Target />);
    const target = screen.getByTestId('target');

    // work around to pass pageX and pageY to the event
    const customEvent = new MouseEvent('mousemove', {
      clientX: 123,
      clientY: 456,
      bubbles: true,
    }) as MouseEvent & { pageX: number; pageY: number };

    customEvent.pageX = 123;
    customEvent.pageY = 456;

    fireEvent(target, customEvent);

    expect(target).toHaveTextContent('{ x: 123, y: 456 }');
  });

  test('mouse move updates the position without a ref', () => {
    const { result } = renderHook(() => useMousePosition());

    fireEvent.mouseMove(document, { clientX: 123, clientY: 456 });

    expect(result.current).toEqual({ ref: expect.any(Object), x: 123, y: 456 });
  });

  test('resetOnExit option resets the position on mouse leave', () => {
    const { result } = renderHook(() => useMousePosition({ resetOnExit: true }));

    fireEvent.mouseMove(document, { clientX: 123, clientY: 456 });

    fireEvent.mouseLeave(document);

    expect(result.current).toEqual({ ref: expect.any(Object), x: 0, y: 0 });
  });
});
