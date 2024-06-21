'use client';
import Review from '@/components/pages/review/Review';
import { ReviewType } from '@/types/boardType';
import React, { useEffect, useState } from 'react';
import style from '../../styles/pages/review/style.module.scss';
import { useRouter } from 'next/navigation';

const page = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [reviews, setReviews] = useState<ReviewType[]>([]);

  const router = useRouter();

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch('http://127.0.0.1:8000/review/post/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await res.json();
        setReviews(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReviews();
  }, []);

  return (
    <div className={style['container']}>
      <h1 className={style['title']}>리뷰</h1>
      <div className={style['write']}>
        <span
          onClick={() => {
            router.push('review/write');
          }}
        >
          글쓰기
        </span>
      </div>
      <section className={style['review-wrapper']}>
        {isLoading ? (
          <div className={style['loading-container']}>loading...</div>
        ) : reviews.length !== 0 ? (
          <div className={style['review-list-container']}>
            {reviews.map((review) => {
              return <Review key={review.id} item={review} />;
            })}
          </div>
        ) : (
          <div className={style['empty']}>
            등록된 리뷰가 없습니다.
          </div>
        )}
      </section>
    </div>
  );
};

export default page;
