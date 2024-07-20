'use client';

import { userState } from '@/states/user';
import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import style from '../../styles/pages/profile/style.module.scss';
import { ReviewType } from '@/types/boardType';
import moment from 'moment';
import { useRouter } from 'next/navigation';

type userInfo = {
  email: string;
  nickname: string;
};

const page = () => {
  const user = useRecoilValue(userState);
  const [userInfo, setUserInfo] = useState<userInfo>({
    email: '',
    nickname: '',
  });
  const [reviews, setReviews] = useState<ReviewType[]>([]);
  const router = useRouter();

  useEffect(() => {
    const getProfile = async () => {
      const access = localStorage.getItem('token');
      const userRes = await fetch('http://127.0.0.1:8000/user/get_user_self/', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${access}`,
        },
        method: 'GET',
      }).then((res) => {
        return res.json();
      });

      const reviews = await fetch(
        `http://127.0.0.1:8000/review/post/?user=${user.userId}&count_per_page=3`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      ).then((res) => {
        return res.json();
      });

      console.log(reviews);

      if (reviews) {
        reviews.map((review: ReviewType) => {
          setReviews((prev) => [...prev, review]);
        });
      }
      setUserInfo({
        email: userRes.data.email,
        nickname: userRes.data.nickname,
      });
    };

    getProfile();
  }, []);

  return (
    <div className={style['container']}>
      <div className={style['profile']}>
        <div className={style['title']}>
          <h4>프로필</h4>
        </div>
        <div className={style['info']}>
          <div>
            <span className={style['label']}>닉네임</span> | {userInfo.nickname}
          </div>
          <div>
            <span className={style['label']}>이메일</span> |{' '}
            {userInfo.email}
          </div>
        </div>
      </div>
      <div className={style['my-review']}>
        <div className={style['title']}>
          <h4>최근 리뷰</h4>
        </div>
        {reviews.length !== 0 ? (
          <div className={style['table']}>
            <div className={style['head']}>
              <span>제목</span>
              <span>작성일자</span>
              <span>조회수</span>
            </div>
            <div className={style['body']}>
              {reviews.map((review, idx) => {
                return (
                  <div
                    className={style['item']}
                    key={idx}
                    onClick={() => {
                      router.push(`/review/${review.id}`);
                    }}
                  >
                    <span>{review.title}</span>
                    <span>
                      {moment(review.created_at).format('YYYY-MM-DD')}
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
    </div>
  );
};

export default page;
