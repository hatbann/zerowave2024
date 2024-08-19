/** @format */

"use client";

import React from "react";
import { FieldValues, useForm } from "react-hook-form";
import style from "../../styles/pages/join/style.module.scss";
import { useRecoilState } from "recoil";
import { useSignupForm } from "@/form/useSignupForm";
import { useRouter } from "next/navigation";
import { userState } from "@/states/user";

export interface JoinFormValue {
  email: string;
  password: string;
  user_name: string;
}

const page = () => {
  const {
    f: {
      setError,
      setValue,
      getValues,
      formState: { errors },
    },
    r,
  } = useSignupForm();
  const router = useRouter();
  const [user, setUser] = useRecoilState(userState);

  const handleSubmit = async () => {
    try {
      const bodyData = {
        nickname: getValues("nickname"),
        email: getValues("email"),
        password: getValues("password"),
      };

      const API_URL =
        process.env.NODE_ENV === "production"
          ? "/api"
          : process.env.NEXT_PUBLIC_API_URL!;
      const res = await fetch(`${API_URL}/user/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyData),
      }).then((res) => {
        return res.json();
      });

      /*       window.localStorage.setItem('token', JSON.stringify(res.token.access));
      window.localStorage.setItem('refresh', JSON.stringify(res.token.refresh));
      setUser({
        username: res.user.nickname,
        userId: res.user.id,
      }); */
      if (res.type === "success") {
        router.push("/join/success");
      }
      return res;
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className={style["container"]}>
      <h1>회원가입</h1>
      <div className={style["form-section"]}>
        <form className={style["form-container"]}>
          <div className={style["form-item"]}>
            <label htmlFor="email">이메일</label>
            <input
              type="email"
              id="email"
              {...r.email}
              placeholder="이메일 입력"
            />
          </div>
          {errors.email && <p>{errors.email.message}</p>}
          <div className={style["form-item"]}>
            <label htmlFor="password">비밀번호</label>
            <input
              type="password"
              id="password"
              {...r.password}
              placeholder="비밀번호 입력"
            />
          </div>
          {errors.password && <p>{errors.password.message}</p>}
          <div className={style["form-item"]}>
            <label htmlFor="re_password">비밀번호 확인</label>
            <input
              type="password"
              id="re_password"
              {...r.re_password}
              placeholder="비밀번호 다시 입력"
            />
          </div>
          {errors.re_password && <p>{errors.re_password.message}</p>}
          <div className={style["form-item"]}>
            <label htmlFor="nickname">닉네임</label>
            <input type="text" id="nickname" {...r.nickname} />
          </div>
          {errors.nickname && <p>{errors.nickname.message}</p>}
        </form>
        <div className={style["btn-container"]}>
          <button
            type="button"
            onClick={handleSubmit}
            className={style["submit-btn"]}>
            회원가입
          </button>
        </div>
      </div>
    </div>
  );
};

export default page;
