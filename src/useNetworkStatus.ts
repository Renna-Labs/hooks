import { useState, useEffect } from "react";

interface NetworkStatus {
  isOnline: boolean;
  offlineAt: Date | undefined;
}

export const useNetworkStatus = (): NetworkStatus => {
  const [status, setStatus] = useState<boolean>(navigator.onLine);
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

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return {
    isOnline: status,
    offlineAt,
  };
};
