'use client';

import { signupHandler } from '@/utils/auth';
import React from 'react';
import { FieldValues, useForm } from 'react-hook-form';

export interface JoinFormValue {
  email: string;
  password: string;
  user_name: string;
}

const page = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<JoinFormValue>({ mode: 'onChange' });
  const onSubmit = (data: JoinFormValue) => console.log(data);

  return (
    <div>
      <form onSubmit={handleSubmit(signupHandler)}>
        <div>
          <label htmlFor="email">이메일</label>
          <input
            id="email"
            type="text"
            placeholder="이메일을 입력하세요"
            {...register('email', {
              required: '필수값입니다',
              pattern: {
                value:
                  /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
                message: '이메일 형식에 맞지 않습니다.',
              },
            })}
          ></input>
          {errors.email && <span>{errors.email.message}</span>}
        </div>
        <div>
          <label htmlFor="password">비밀번호</label>
          <input
            type="password"
            id="password"
            {...register('password', {
              required: '필수값입니다',
              pattern: {
                value: /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/,
                message: '비밀번호는 영문과 숫자 포함해 8자리 이상',
              },
            })}
          ></input>
          {errors.password && <span>{errors.password.message}</span>}
        </div>
        <div>
          <label htmlFor="username">닉네임</label>
          <input
            type="text"
            id="username"
            {...register('user_name', {
              required: '필수값입니다',
            })}
          ></input>
          {errors.user_name && <span>{errors.user_name.message}</span>}
        </div>
        <button type="submit">submit</button>
      </form>
    </div>
  );
};

export default page;
