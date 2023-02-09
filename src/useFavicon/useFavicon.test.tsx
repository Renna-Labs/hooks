import { render, act } from '@testing-library/react';
import React, { useState } from 'react';
import { useFavicon } from './useFavicon';

const Target = ({
  initUrl = 'https://twitter.com/favicon.ico',
  nextUrl = 'https://mantine.dev/favicon.svg',
}: {
  initUrl?: string;
  nextUrl?: string;
}) => {
  const [url, setUrl] = useState(initUrl);
  useFavicon(url);

  return (
    <div>
      <button type="button" data-testid="update-favicon" onClick={() => setUrl(nextUrl)}>
        Update Favicon
      </button>
    </div>
  );
};

describe('useFavicon', () => {
  it('creates a link element with correct attributes based on url', () => {
    render(<Target />);

    const linkElement = document.querySelector<HTMLLinkElement>('link[rel*="icon"]');
    expect(linkElement).toBeTruthy();
    expect(linkElement!.rel).toEqual('shortcut icon');
    expect(linkElement!.href).toEqual('https://twitter.com/favicon.ico');
    expect(linkElement!.type).toEqual('image/x-icon');
  });

  it('updates the link element when the url changes', () => {
    const { getByTestId } = render(<Target />);

    let linkElement = document.querySelector<HTMLLinkElement>('link[rel*="icon"]');
    expect(linkElement!.href).toEqual('https://twitter.com/favicon.ico');
    expect(linkElement!.type).toEqual('image/x-icon');

    act(() => {
      getByTestId('update-favicon').click();
    });

    linkElement = document.querySelector<HTMLLinkElement>('link[rel*="icon"]');
    expect(linkElement).toBeTruthy();
    expect(linkElement!.rel).toEqual('shortcut icon');
    expect(linkElement!.href).toEqual('https://mantine.dev/favicon.svg');
    expect(linkElement!.type).toEqual('image/svg+xml');
  });

  it('returns correct mime types', () => {
    const { getByTestId } = render(
      <Target
        initUrl="https://twitter.com/favicon.gif"
        nextUrl="https://twitter.dev/favicon.png"
      />,
    );

    let linkElement = document.querySelector<HTMLLinkElement>('link[rel*="icon"]');
    expect(linkElement).toBeTruthy();
    expect(linkElement!.type).toEqual('image/gif');

    act(() => {
      getByTestId('update-favicon').click();
    });

    linkElement = document.querySelector<HTMLLinkElement>('link[rel*="icon"]');
    expect(linkElement).toBeTruthy();
    expect(linkElement!.type).toEqual('image/png');
  });
});
