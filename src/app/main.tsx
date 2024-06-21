'use client';

import RedirectHome from '@/components/common/RedirectHome';
import { useLoginState } from '@/hooks/useLoginState';
import { isLoginLoading, userState } from '@/states/user';
import { usePathname } from 'next/navigation';
import React from 'react';
import { useRecoilValue } from 'recoil';
import style from '../styles/common/main.module.scss';

const Main = ({ children }: { children: React.ReactNode }) => {
  const pagesNeedSignedIn: string[] = ['/profile', '/review', '/review/write'];
  const pagesNeedSignedOut: string[] = ['/login', '/join'];

  const user = useRecoilValue(userState);
  //const isLoading = useRecoilValue(isLoginLoading);
  const loading = useLoginState();
  const isLogin = user.userId !== -1;
  const pathname = usePathname();

  const isPageOnlyInLoggedIn = pagesNeedSignedIn.some((p) =>
    pathname.includes(p)
  );
  const isPageOnlyInLoggedOut = pagesNeedSignedOut.some((p) =>
    pathname.includes(p)
  );

  console.log(isLogin, isPageOnlyInLoggedIn, pathname);

  if (loading) {
    return <div className={style['loading']}>loading...</div>;
  } else {
    if (isLogin) {
      if (isPageOnlyInLoggedIn) {
        return <>{children}</>;
      } else if (isPageOnlyInLoggedOut) {
        return <RedirectHome />;
      }
    } else {
      if (isPageOnlyInLoggedIn) {
        return <RedirectHome />;
      } else if (isPageOnlyInLoggedOut) {
        return <>{children}</>;
      }
    }
  }
};

export default Main;
