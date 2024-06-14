import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

const RedirectHome = () => {
  const router = useRouter();

  useEffect(() => {
    router.push('/');
  });
  return <div></div>;
};

export default RedirectHome;
