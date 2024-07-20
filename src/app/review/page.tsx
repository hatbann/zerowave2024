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
        const res = await fetch(
          'http://127.0.0.1:8000/review/post/?order_by=-created_at',
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        const data = await res.json();
        if (data.length !== 0) {
          const users = data.map((res: ReviewType) => {
            return res.author;
          });
          const ids = String(users);
          const userData = await fetch(
            `http://127.0.0.1:8000/user/get_nickname/?id__in[]=${ids}`,
            {
              headers: {
                'Content-Type': 'application/json',
              },
              method: 'GET',
            }
          ).then((res) => res.json());
          const userArr: { id: number; nickname: string }[] = JSON.parse(
            userData.data
          );
          const reviewRes: ReviewType[] = [];
          data.map((item: ReviewType) => {
            const name = userArr.find(
              (data) => data.id === item.author
            )?.nickname;
            const temp: ReviewType = {
              id: item.id,
              title: item.title,
              content: item.content,
              created_at: item.created_at,
              updated_at: item.updated_at,
              author: item.author,
              authorName: name ?? '',
              views: item.views,
              location: item.location,
              address: item.address,
            };
            reviewRes.push(temp);
          });
          setReviews(reviewRes);
        } else {
          setReviews([]);
        }
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
      <section className={style['review-wrapper']}>
        {isLoading ? (
          <div className={style['loading-container']}>loading...</div>
        ) : reviews.length !== 0 ? (
          <div className={style['review-list-container']}>
            {reviews.map((review, idx) => {
              return (
                <Review
                  key={review.id}
                  item={review}
                  index={idx + 1}
                  isLast={idx === reviews.length - 1}
                />
              );
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
