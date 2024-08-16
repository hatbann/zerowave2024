import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import style from '../../styles/common/redirectHome.module.scss';

const isNeedLogin = () => {
  const router = useRouter();

  return (
    <div className={style['container']}>
      <h3>로그인 후 이용할 수 있습니다</h3>
      <div className={style['btn-container']}>
        <button
          className={style['home']}
          onClick={() => {
            router.push('/');
          }}
        >
          홈으로
        </button>
        <button
          className={style['login']}
          onClick={() => {
            router.push('/login');
          }}
        >
          로그인
        </button>
      </div>
    </div>
  );
};

const RedirectHome = () => {
  const router = useRouter();

  useEffect(() => {
    router.push('/');
  }, []);

  return <></>;
};
export default RedirectHome;

export { isNeedLogin };
