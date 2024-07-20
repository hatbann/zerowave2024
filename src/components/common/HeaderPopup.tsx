import React from 'react';
import style from '../../styles/common/headerPopup.module.scss';
import { useResetRecoilState } from 'recoil';
import { userState } from '@/states/user';
import { useRouter } from 'next/navigation';

type Props = {
  handleLogout: () => void;
  handleRouteProfile: () => void;
};

const HeaderPopup = ({ handleLogout, handleRouteProfile }: Props) => {
  return (
    <div className={style['header-popup']}>
      <div className={style['popup-item']} onClick={handleRouteProfile}>
        <img src="/images/png/mypage.png" alt="mypage" />
        <span>마이페이지</span>
      </div>
      <div className={style['popup-item']} onClick={handleLogout}>
        <img src="/images/png/logout.png" alt="logout" />
        <span>로그아웃</span>
      </div>
    </div>
  );
};

export default HeaderPopup;
