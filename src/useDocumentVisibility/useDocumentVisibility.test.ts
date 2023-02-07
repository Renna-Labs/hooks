import { renderHook, fireEvent } from '@testing-library/react';
import { useDocumentVisibility } from './useDocumentVisibility';

describe('useDocumentVisibility', () => {
  beforeAll(() => {
    Object.defineProperty(document, 'visibilityState', {
      value: 'visible',
      writable: true,
    });
  });

  it('return default visibility state', () => {
    const { result } = renderHook(() => useDocumentVisibility());

    expect(result.current).toBe('visible');
  });

  it('should update return value when visibilityState changes', () => {
    const { result } = renderHook(() => useDocumentVisibility());

    expect(result.current).toBe('visible');

    // @ts-ignore
    document.visibilityState = 'hidden';

    fireEvent(document, new Event('visibilitychange'));

    expect(result.current).toBe('hidden');
    // @ts-ignore
    document.visibilityState = 'visible';

    fireEvent(document, new Event('visibilitychange'));

    expect(result.current).toBe('visible');
  });
});
