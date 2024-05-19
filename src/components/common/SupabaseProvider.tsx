'use client';

import React from 'react';
import { useState } from 'react';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { SessionContextProvider } from '@supabase/auth-helpers-react';

const SupabaseProvider = ({ children }: { children: React.ReactNode }) => {
  const [supabaseClient] = useState(() => createClientComponentClient());

  return (
    <SessionContextProvider supabaseClient={supabaseClient}>
      {children}
    </SessionContextProvider>
  );
};

export default SupabaseProvider;
