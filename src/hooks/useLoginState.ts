'use client';

import { isLoginLoading, userState } from '@/states/user';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

export const useLoginState = () => {
  const [, setUser] = useRecoilState(userState);
  const [isLoading, setIsLoading] = useRecoilState(isLoginLoading);
  const pathname = usePathname();

  const getLoginState = async (refresh: string) => {
    const response = await fetch('http://127.0.0.1:8000/user/token/refresh/', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        refresh: refresh,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
        alert('다시 로그인!');
        window.localStorage.removeItem('token');
        window.localStorage.removeItem('refresh');
        return false;
      });

    if (response.detail === 'refresh success') {
      const access = response.access;
      const userRes = await fetch('http://127.0.0.1:8000/user/get_user_self/', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${access}`,
        },
        method: 'GET',
      }).then((res) => {
        return res.json();
      });

      setUser({
        username: userRes.data.nickname,
        userId: userRes.data.id,
      });
      window.localStorage.setItem('token', response.access);
      window.localStorage.setItem('refresh', response.refresh);
    } else {
      alert('다시 로그인!');
      window.localStorage.removeItem('token');
      window.localStorage.removeItem('refresh');
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (pathname !== '/signin') {
      const refresh = localStorage.getItem('refresh');
      const token = localStorage.getItem('token');
      if (refresh && token) {
        const result = getLoginState(refresh);
        console.log(result);
      } else {
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
    }
  }, []);

  return isLoading;
};
