'use client';

import { useEffect, useRef } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import { sendIdentity } from 'src/lib/sitecore/send-identity';

const SESSION_KEY = 'cdp_identity_sent';

/**
 * Renderless component that fires a CDP IDENTITY event once per browser session
 * after an Auth0 login. Links the anonymous CDP guest profile to the user's email.
 *
 * Render inside <UserProvider> (for useUser) and after <Bootstrap> (for Cloud SDK init).
 */
const CdpIdentityOnLogin = (): null => {
  const { user, isLoading } = useUser();
  const hasFired = useRef(false);

  useEffect(() => {
    if (isLoading) return;
    if (!user?.email) return;

    // React strict mode double-invoke guard
    if (hasFired.current) return;

    // Already sent for this email this browser session
    const email = user.email.toLowerCase().trim();
    if (typeof window !== 'undefined' && sessionStorage.getItem(SESSION_KEY) === email) return;

    hasFired.current = true;

    sendIdentity(email)
      .then(() => {
        sessionStorage.setItem(SESSION_KEY, email);
        console.debug('[CdpIdentityOnLogin] Identity event sent for', email);
      })
      .catch((e: unknown) => {
        // Reset so it retries on next navigation if Cloud SDK wasn't ready
        hasFired.current = false;
        console.debug('[CdpIdentityOnLogin] Identity event failed:', e);
      });
  }, [user, isLoading]);

  return null;
};

export default CdpIdentityOnLogin;
