'use client';

import React from 'react';
import { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import { useRecoilValue } from 'recoil';
import style from '../../../../styles/pages/review/reviewEdit.module.scss';
import { ReviewDetailType } from '../../[id]/page';
import { useReviewForm } from '@/form/useReviewForm';
import { userState } from '@/states/user';
import { PlaceType } from '@/types/boardType';

const page = ({ params }: { params: { id: string } }) => {
  const [data, setData] = useState<ReviewDetailType>({
    title: '',
    author: -1,
    authorName: '',
    content: '',
    views: 0,
  });
  const [isLoadingData, setIsLoadingData] = useState(true);
  const router = useRouter();
  const [placeInfo, setPlaceInfo] = useState<PlaceType>({
    placeName: undefined,
    address: undefined,
  });

  const {
    f: {
      setError,
      setValue,
      getValues,
      formState: { errors },
    },
    r,
  } = useReviewForm({
    location: placeInfo.placeName,
    address: placeInfo.address,
  });
  const user = useRecoilValue(userState);

  useEffect(() => {
    console.log(params.id);
    const getData = async () => {
      const res = await fetch(
        `http://127.0.0.1:8000/review/post/${params.id}`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'GET',
        }
      )
        .then((res) => res.json())
        .catch((e) => {
          console.log(e);
        });

      if (res) {
        const userData = await fetch(
          `http://127.0.0.1:8000/user/get_nickname/?id=${res.author}`,
          {
            headers: {
              'Content-Type': 'application/json',
            },
            method: 'GET',
          }
        )
          .then((res) => res.json())
          .then((res) => {
            const parsingData = JSON.parse(res.data);
            return parsingData[0];
          });

        setPlaceInfo({
          placeName: res.location,
          address: res.address,
        });
        const result: ReviewDetailType = {
          title: res.title,
          author: res.author,
          authorName: userData.nickname,
          content: res.content,
          views: res.views,
        };
        setValue('title', res.title);
        setValue('content', res.content);
        setData(result);
      } else {
        setData({
          title: '',
          author: -1,
          authorName: '',
          content: '',
          views: 0,
        });
      }

      setIsLoadingData(false);
    };

    getData();
  }, []);

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
      };
      const response = await fetch(
        `http://127.0.0.1:8000/review/post/${params.id}/`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'PUT',
          body: JSON.stringify(bodyData),
        }
      )
        .then((res) => {
          res.json();
        })
        .catch((e) => {
          console.log(e);
        });
      router.push(`/review/${params.id}`);
    }
  };

  return (
    <div>
      <div className={style['container']}>
        {isLoadingData ? (
          <div className={style['loading']}>loading...</div>
        ) : (
          <div className={style['content-wrapper']}>
            <section className={style['content']}>
              <div className={`${style['item']} ${style['title']}`}>
                <label className={style['item-label']} htmlFor="title">
                  제목
                </label>
                <input
                  className={style['item-input']}
                  id="title"
                  /*       placeholder={data.title} */
                  {...r.title}
                />
              </div>
              <div className={`${style['item']} ${style['body']}`}>
                <label className={style['item-label']} htmlFor="body">
                  내용
                </label>
                <textarea
                  className={style['item-input']}
                  /*     placeholder={data.content} */
                  id="body"
                  {...r.content}
                />
              </div>
            </section>
            <div className={style['btn-container']}>
              <button
                className={style['cancel']}
                onClick={() => {
                  router.back();
                }}
              >
                취소
              </button>
              <button
                className={style['submit']}
                onClick={() => {
                  onSubmit();
                }}
              >
                완료
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default page;
