'use client';

import React from 'react';
import style from '../../../styles/pages/review/write.module.scss';
import { ReviewInputs, useReviewForm } from '@/form/useReviewForm';
import { useRecoilValue } from 'recoil';
import { userState } from '@/states/user';

const page = () => {
  const address = '제주특별자치도 제주시 첨단로 242';
  const location = '우리집';
  const {
    f: {
      setError,
      setValue,
      getValues,
      formState: { errors },
    },
    r,
  } = useReviewForm({ location: location, address: address });
  const user = useRecoilValue(userState);

  const onSubmit = async () => {
    if (getValues('title').length < 1) {
      setError('title', {
        message: '필수 입력 항목입니다',
      });
    } else if (getValues('content').length < 1) {
      setError('content', {
        message: '필수 입력 항목입니다',
      });
    } else {
      const bodyData = {
        title: getValues('title'),
        content: getValues('content'),
        author: user.userId,
        location: getValues('location'),
      };
      const response = await fetch('http://127.0.0.1:8000/review/post/', {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(bodyData),
      })
        .then((res) => {
          res.json();
        })
        .catch((e) => {
          console.log(e);
        });
      console.log(response);
    }
  };

  return (
    <div className={style['container']}>
      <h1 className={style['head']}>글쓰기</h1>
      <section className={style['form-section']}>
        <div className={`${style['input']} ${style['title']}`}>
          <label htmlFor="title">제목</label>
          <input type="text" placeholder={'제목을 입력하세요'} {...r.title} />
          {errors.title && (
            <p className={style['error']}>{errors.title.message}</p>
          )}
        </div>
        <div className={`${style['input']} ${style['location']}`}>
          <label htmlFor="location">위치</label>
          <input
            type="text"
            id="location"
            value={`${location}(${address})`}
            disabled
          />
        </div>
        <div className={`${style['input']} ${style['content']}`}>
          <label htmlFor="content">내용</label>
          <textarea
            id="content"
            placeholder={'내용을 입력하세요'}
            {...r.content}
          />
          {errors.content && (
            <p className={style['error']}>{errors.content.message}</p>
          )}
        </div>
        <button
          onClick={() => {
            onSubmit();
          }}
          type="button"
        >
          완료
        </button>
      </section>
    </div>
  );
};

export default page;
