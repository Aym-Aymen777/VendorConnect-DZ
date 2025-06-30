import { useEffect, useRef } from "react";
import useAuthStore from "../store/AuthStore";

export const useAuthCheck = () => {
  const { authCheck, user, isAuthenticated, loading, error, lastChecked } = useAuthStore();
  const hasChecked = useRef(false);
  const retryCount = useRef(0);
  const maxRetries = 3;

  useEffect(() => {
    let isMounted = true;
    let retryTimeout;

    const performAuthCheck = async (isRetry = false) => {
      // Skip if component unmounted
      if (!isMounted) return;

      // Skip if already authenticated and recently checked (within 5 minutes)
      if (!isRetry && isAuthenticated && lastChecked) {
        const fiveMinutesAgo = Date.now() - (5 * 60 * 1000);
        const lastCheckTime = new Date(lastChecked).getTime();
        if (lastCheckTime > fiveMinutesAgo) {
          return;
        }
      }

      // Skip if already checking to prevent duplicate calls
      if (!isRetry && loading) return;

      try {
        await authCheck();
        retryCount.current = 0; // Reset on success
        hasChecked.current = true;
      } catch (err) {
        console.error('Auth check failed:', err);
        
        // Retry logic with exponential backoff
        if (retryCount.current < maxRetries && isMounted) {
          retryCount.current++;
          const delay = Math.pow(2, retryCount.current - 1) * 1000; // 1s, 2s, 4s
          
          retryTimeout = setTimeout(() => {
            if (isMounted) {
              performAuthCheck(true);
            }
          }, delay);
        }
      }
    };

    // Only run if we haven't checked yet or if we need to recheck
    if (!hasChecked.current || (!isAuthenticated && !loading)) {
      performAuthCheck();
    }

    // Cleanup function
    return () => {
      isMounted = false;
      if (retryTimeout) {
        clearTimeout(retryTimeout);
      }
    };
  }, []); // Empty dependency array - only run once on mount

  return { user, isAuthenticated, loading, error };
};
