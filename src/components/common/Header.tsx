'use client';

import React, { useState } from 'react';
import style from '../../styles/common/header.module.scss';
import { isLoginLoading, userState } from '@/states/user';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import { usePathname, useRouter } from 'next/navigation';
import HeaderPopup from './HeaderPopup';

const Header = () => {
  const isLoginLoadingState = useRecoilValue(isLoginLoading);
  const user = useRecoilValue(userState);
  const router = useRouter();
  const pathname = usePathname();
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const resetUser = useResetRecoilState(userState);

  const logout = async () => {
    const res = await fetch('http://127.0.0.1:8000/user/logout/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    window.localStorage.removeItem('token');
    window.localStorage.removeItem('refresh');
    resetUser();
    setIsOpenPopup(false);
  };

  return (
    <div className={style['header-container']}>
      <div className={style['header-left']}>
        <img
          src="/images/png/mainLogo.png"
          className={style['logo-img']}
          onClick={() => {
            router.push('/');
          }}
        />
        <div className={style['menus']}>
          <span
            className={pathname === '/map' ? style['selected'] : ''}
            onClick={() => {
              router.push('/map');
            }}
          >
            Map
          </span>
          <span
            className={pathname === '/review' ? style['selected'] : ''}
            onClick={() => {
              router.push('/review');
            }}
          >
            Review
          </span>
        </div>
      </div>
      <div className={style['header-right']}>
        {!isLoginLoadingState ? (
          user.userId === -1 ? (
            <button
              className={style['login']}
              onClick={() => {
                router.push('/login');
              }}
            >
              로그인
            </button>
          ) : (
            <span
              onClick={() => {
                setIsOpenPopup((prev) => !prev);
              }}
              className={style['user-name']}
            >
              {user.username}
            </span>
          )
        ) : (
          <div className={style['loading-userinfo-empty']}></div>
        )}
        {isOpenPopup && (
          <HeaderPopup
            handleLogout={logout}
            handleRouteProfile={() => {
              router.push('/profile');
              setIsOpenPopup(false);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Header;
