'use client';

import React from 'react';
import style from '../../styles/common/header.module.scss';
import { isLoginLoading, user } from '@/states/user';
import { useRecoilValue } from 'recoil';
import { usePathname, useRouter } from 'next/navigation';

const Header = () => {
  const isLoginLoadingState = useRecoilValue(isLoginLoading);
  const userState = useRecoilValue(user);
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className={style['header-container']}>
      <div className={style['header-right']}>
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
      <div className={style['header-left']}>
        {!isLoginLoadingState ? (
          userState.userId === -1 ? (
            <button
              className={style['login']}
              onClick={() => {
                router.push('/login');
              }}
            >
              로그인
            </button>
          ) : (
            <span>{userState.username}</span>
          )
        ) : (
          <div className={style['loading-userinfo-empty']}></div>
        )}
      </div>
    </div>
  );
};

export default Header;
