'use client';

import Modal from '@/components/common/Modal';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import style from '../../../styles/pages/review/reviewDetail.module.scss';
import { useRecoilValue } from 'recoil';
import { userState } from '@/states/user';
import { PlaceType } from '@/types/boardType';

export type ReviewDetailType = {
  title: string;
  author: string;
  authorName: string;
  content: string;
  views: number;
};

const page = ({ params }: { params: { id: string } }) => {
  const [data, setData] = useState<ReviewDetailType>({
    title: '',
    author: '',
    authorName: '',
    content: '',
    views: 0,
  });
  const [isLoadingData, setIsLoadingData] = useState(true);
  const user = useRecoilValue(userState);
  const router = useRouter();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenErrorModal, setIsOpenErrorModal] = useState(false);
  const [place, setPlace] = useState<PlaceType>({
    address: undefined,
    placeName: undefined,
  });

  useEffect(() => {
    const getData = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_DEV_URL}/api/review/${params.id}`,
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

      console.log(res);

      if (res) {
        const userData = await fetch(
          `${process.env.NEXT_PUBLIC_DEV_URL}/api/review/author?id=${res[0].author}`,
          {
            headers: {
              'Content-Type': 'application/json',
            },
            method: 'GET',
          }
        ).then((res) => res.json());

        setPlace({
          address: res[0].address,
          placeName: res[0].location,
        });

        console.log(res);
        const result: ReviewDetailType = {
          title: res[0].title,
          author: res[0].author,
          authorName: userData.data.nickname,
          content: res[0].content,
          views: res[0].views,
        };
        console.log(result);
        setData(result);
      } else {
        setData({
          title: '',
          author: '',
          authorName: '',
          content: '',
          views: 0,
        });
      }

      setIsLoadingData(false);
    };

    getData();
  }, []);

  const clickDelete = () => {
    const requestDelete = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_DEV_URL}/api/review/${params.id}`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'DELETE',
        }
      )
        .then((res) => {
          if (res) {
            setIsOpenModal(false);
            router.replace('/review');
          }
        })
        .catch((e) => {
          console.log(e);
          setIsOpenErrorModal(true);
        });
    };

    requestDelete();
  };

  return (
    <div className={style['container']}>
      {isLoadingData ? (
        <div className={style['loading']}>loading...</div>
      ) : (
        <>
          <div className={style['location']}>
            <h3>{place.placeName}</h3>
            {place.address !== '' && <span>({place.address})</span>}
          </div>
          <div className={style['content-wrapper']}>
            <section className={style['content']}>
              <div className={style['content-header']}>
                <div className={style['header-item']}>
                  <p className={style['item-label']}>제목</p>
                  <div className={style['line']}></div>
                  <p className={style['item-value']}>{data.title}</p>
                </div>
                <div className={style['header-item']}>
                  <p className={style['item-label']}>글쓴이</p>
                  <p className={style['line']}></p>
                  <p className={style['item-value']}>{data.authorName}</p>
                </div>
              </div>
              <div className={style['content-body']}>
                <div className={style['views']}>
                  <span>조회수</span>
                  <span>{data.views}회</span>
                </div>
                <div className={style['contents']}>{data.content}</div>
              </div>
            </section>
            {user.userId === data.author && (
              <div className={style['btn-container']}>
                <button
                  className={style['edit-btn']}
                  onClick={() => {
                    router.push(`edit/${params.id}`);
                  }}
                >
                  수정
                </button>
                <button
                  className={style['delete-btn']}
                  onClick={() => {
                    setIsOpenModal(true);
                  }}
                >
                  삭제
                </button>
              </div>
            )}
            <div
              className={style['go-back']}
              onClick={() => {
                router.back();
              }}
            >
              목록
            </div>
          </div>
        </>
      )}
      <Modal
        title="정말로 삭제하시겠습니까?"
        confirmText="delete"
        confirmEvent={clickDelete}
        cancelText="취소"
        cancelEvent={() => {
          setIsOpenModal(false);
        }}
        isVisible={isOpenModal}
      />
      <Modal
        title="삭제에 실패했습니다"
        subTitle="잠시 후 다시 시도해주세요"
        confirmText="confirm"
        confirmEvent={() => {
          setIsOpenErrorModal(false);
        }}
        isVisible={isOpenErrorModal}
      />
    </div>
  );
};

export default page;
