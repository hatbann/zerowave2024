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
          `${process.env.NEXT_PUBLIC_DEV_URL}/api/review`,
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
            if (res.author !== null) return res.author;
          });
          const id = String(users);
          console.log(id);
          const userData = await fetch(
            `${process.env.NEXT_PUBLIC_DEV_URL}/api/user/nickname/${id}`,
            {
              headers: {
                'Content-Type': 'application/json',
              },
              method: 'GET',
            }
          ).then((res) => res.json());
          const userArr: { id: number; nickname: string }[] = userData.data;
          const reviewRes: ReviewType[] = [];
          console.log(userArr, data);
          data.map((item: ReviewType) => {
            const name = userArr.find(
              (data) => data.id === item.author
            )?.nickname;
            console.log(data);
            const temp: ReviewType = {
              _id: item._id,
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
          console.log(reviewRes);
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
                  key={review._id}
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
