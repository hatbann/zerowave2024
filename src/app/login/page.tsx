/** @format */

"use client";

import { useSinginForm } from "@/form/useLoginForm";
import React from "react";
import style from "../../styles/pages/login/style.module.scss";
import { useRecoilState } from "recoil";
import { userState } from "@/states/user";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useSession } from "@supabase/auth-helpers-react";

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
        email: getValues("email"),
        password: getValues("password"),
      };

      const API_URL =
        process.env.NODE_ENV === "production"
          ? "/"
          : process.env.NEXT_PUBLIC_API_URL!;

      const res: { user: any; token: any } = await fetch(
        `${API_URL}/api/user/signin`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bodyData),
        }
      ).then((res) => {
        return res.json();
      });
      console.log(res.user._id);
      /*       window.localStorage.setItem('token', res.token.access);
      window.localStorage.setItem('refresh', res.token.refresh) */
      setUser({
        username: res.user.nickname,
        userId: res.user._id,
      });
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  /*   const handleSubmit = async () => {
    await signIn('credentials', {
      email: getValues('email'),
      password: getValues('password'),
      redirect: false,
    }).then((result) => {
      console.log(result);

      if (result!.error) {
        alert(result?.error);
        return;
      }

      router.push('/');
    });
  }; */

  return (
    <div className={style["container"]}>
      <h1>로그인</h1>
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
            {errors.email && (
              <p className={style["error"]}>{errors.email.message}</p>
            )}
          </div>
          <div className={style["form-item"]}>
            <label htmlFor="password">비밀번호</label>
            <input
              type="password"
              id="password"
              {...r.password}
              placeholder="비밀번호 입력"
            />
            {errors.password && (
              <p className={style["error"]}>{errors.password.message}</p>
            )}
          </div>
        </form>
        <div className={style["btn-container"]}>
          <button type="button" onClick={handleSubmit}>
            로그인
          </button>
        </div>
      </div>
      <button
        className={style["join-btn"]}
        onClick={() => {
          router.push("/join");
        }}>
        회원가입
      </button>
    </div>
  );
};

export default page;
