'use client';

import React from 'react';
import style from '../../../../styles/pages/review/write.module.scss';
import { useRouter } from 'next/navigation';

const page = () => {
  const router = useRouter();

  return (
    <div className={style['success-container']}>
      <img src="/images/png/success.png" alt="success" />
      <h4>글 작성을 완료했습니다</h4>
      <button
        onClick={() => {
          router.replace('/review');
        }}
      >
        리뷰 보러 가기
      </button>
    </div>
  );
};

export default page;
