'use client';

import { useSinginForm } from '@/form/useLoginForm';
import React from 'react';
import style from '../../styles/pages/login/style.module.scss';
import { useRecoilState } from 'recoil';
import { userState } from '@/states/user';
import { useRouter } from 'next/navigation';

const page = () => {
  const {
    f: {
      setError,
      setValue,
      getValues,
      formState: { errors },
    },
    r,
  } = useSinginForm();
  const [user, setUser] = useRecoilState(userState);
  const router = useRouter();

  const handleSubmit = async () => {
    try {
      const bodyData = {
        email: getValues('email'),
        password: getValues('password'),
      };

      const res: { user: any; token: any } = await fetch(
        'http://127.0.0.1:8000/user/login/',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(bodyData),
        }
      ).then((res) => {
        return res.json();
      });
      window.localStorage.setItem('token', res.token.access);
      window.localStorage.setItem('refresh', res.token.refresh);
      setUser({
        username: res.user.nickname,
        userId: res.user.id,
      });
      router.push('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={style['container']}>
      <h1>로그인</h1>
      <div className={style['form-section']}>
        <form className={style['form-container']}>
          <div className={style['form-item']}>
            <label htmlFor="email">이메일</label>
            <input
              type="email"
              id="email"
              {...r.email}
              placeholder="이메일 입력"
            />
            {errors.email && (
              <p className={style['error']}>{errors.email.message}</p>
            )}
          </div>
          <div className={style['form-item']}>
            <label htmlFor="password">비밀번호</label>
            <input
              type="password"
              id="password"
              {...r.password}
              placeholder="비밀번호 입력"
            />
            {errors.password && (
              <p className={style['error']}>{errors.password.message}</p>
            )}
          </div>
        </form>
        <div className={style['btn-container']}>
          <button type="button" onClick={handleSubmit}>
            로그인
          </button>
        </div>
      </div>
      <button
        className={style['join-btn']}
        onClick={() => {
          router.push('/join');
        }}
      >
        회원가입
      </button>
    </div>
  );
};

export default page;
