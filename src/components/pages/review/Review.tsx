import { ReviewType } from '@/types/boardType';
import { useRouter } from 'next/navigation';
import React from 'react';
import style from '../../../styles/pages/review/style.module.scss';

const Review = ({
  item,
  index,
  isLast,
}: {
  item: ReviewType;
  index: number;
  isLast: boolean;
}) => {
  const router = useRouter();

  return (
    <div
      onClick={() => {
        router.push(`/review/${item.id}`);
      }}
      className={isLast ? `${style['list']} ${style['last']}` : style['list']}
    >
      <span className={style['index']}>{index}</span>
      <span className={style['title']}>{item.title}</span>
      <span className={style['author']}>{item.authorName}</span>
    </div>
  );
};

export default Review;
