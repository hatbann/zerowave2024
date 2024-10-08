/** @format */

"use client";

import { userState } from "@/states/user";
import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import style from "../../styles/pages/profile/style.module.scss";
import { ReviewType } from "@/types/boardType";
import moment from "moment";
import { useRouter } from "next/navigation";

type userInfo = {
  email: string;
  nickname: string;
};

const page = () => {
  const user = useRecoilValue(userState);
  const [isLoading, setIsLoading] = useState(true);
  const [userInfo, setUserInfo] = useState<userInfo>({
    email: "",
    nickname: "",
  });
  const [reviews, setReviews] = useState<ReviewType[]>([]);
  const router = useRouter();

  const API_URL =
    process.env.NODE_ENV === "production"
      ? "/api"
      : `${process.env.NEXT_PUBLIC_API_URL}/api`!;

  useEffect(() => {
    const getProfile = async () => {
      const userRes = await fetch(`${API_URL}/user/profile`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "GET",
      }).then((res) => {
        return res.json();
      });

      const reviews = await fetch(
        `${API_URL}/user/profile/review/${user.userId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      ).then((res) => {
        return res.json();
      });

      console.log(userRes);

      if (reviews.data) {
        reviews.data.map((review: ReviewType) => {
          setReviews((prev) => [...prev, review]);
        });
      }
      setUserInfo({
        email: userRes.user.email,
        nickname: userRes.user.nickname,
      });
      setIsLoading(false);
    };

    getProfile();
  }, []);

  return (
    <div className={style["container"]}>
      {isLoading ? (
        <div className={style["loading"]}>loading...</div>
      ) : (
        <>
          {" "}
          <div className={style["profile"]}>
            <div className={style["title"]}>
              <h4>프로필</h4>
            </div>
            <div className={style["info"]}>
              <div>
                <span className={style["label"]}>닉네임</span> |{" "}
                {userInfo.nickname}
              </div>
              <div>
                <span className={style["label"]}>이메일</span> |{" "}
                {userInfo.email}
              </div>
            </div>
          </div>
          <div className={style["my-review"]}>
            <div className={style["title"]}>
              <h4>최근 리뷰</h4>
            </div>
            {reviews.length !== 0 ? (
              <div className={style["table"]}>
                <div className={style["head"]}>
                  <span>제목</span>
                  <span>작성일자</span>
                  <span>조회수</span>
                </div>
                <div className={style["body"]}>
                  {reviews.map((review, idx) => {
                    return (
                      <div
                        className={style["item"]}
                        key={idx}
                        onClick={() => {
                          router.push(`/review/${review._id}`);
                        }}>
                        <span>{review.title}</span>
                        <span>
                          {moment(review.created_at).format("YYYY-MM-DD")}
                        </span>
                        <span>{review.views}회</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div>작성한 글이 없습니다</div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default page;
