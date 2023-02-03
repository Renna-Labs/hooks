import { useState, useEffect } from 'react';
import { isClient } from '../utils';

interface NetworkStatus {
  isOnline: boolean;
  offlineAt: Date | undefined;
}

function getInitialValue(): boolean {
  if (isClient && typeof navigator !== 'undefined') {
    return navigator.onLine;
  }

  return false;
}

export const useNetworkStatus = (): NetworkStatus => {
  const [status, setStatus] = useState<boolean>(getInitialValue());
  const [offlineAt, setOfflineAt] = useState<Date | undefined>(undefined);

  useEffect(() => {
    const handleOnline = () => {
      setStatus(true);
      setOfflineAt(undefined);
    };

    const handleOffline = () => {
      setStatus(false);
      setOfflineAt(new Date());
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return {
    isOnline: status,
    offlineAt,
  };
};
