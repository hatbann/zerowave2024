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
  author: number;
  authorName: string;
  content: string;
  views: number;
};

const page = ({ params }: { params: { id: string } }) => {
  const [data, setData] = useState<ReviewDetailType>({
    title: '',
    author: -1,
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

        setPlace({
          address: res.address,
          placeName: res.location,
        });

        console.log(res);
        const result: ReviewDetailType = {
          title: res.title,
          author: res.author,
          authorName: userData.nickname,
          content: res.content,
          views: res.views,
        };
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

  const clickDelete = () => {
    const requestDelete = async () => {
      const res = await fetch(
        `http://127.0.0.1:8000/review/post/${params.id}`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'DELETE',
        }
      )
        .then((res) => {
          if (res.ok) {
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
                <div className={style['contents']}>{data.content}d</div>
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
