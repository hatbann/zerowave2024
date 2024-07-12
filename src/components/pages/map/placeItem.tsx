import { PlaceListType } from '@/app/map/page';
import React from 'react';
import style from '../../../styles/pages/map/placeItem.module.scss';

type Props = {
  placeItem: PlaceListType;
  isSelected: boolean;
};

const PlaceItem = ({ placeItem, isSelected }: Props) => {
  return (
    <div
      className={
        isSelected
          ? `${style['item-container']} ${style['selected']}`
          : style['item-container']
      }
    >
      <div className={style['item-info']}>
        <img src="" alt="" className={style['img']} />
        <div className={style['info']}>
          <span className={style['place']}>{placeItem.place_name}</span>
          <span className={style['address']}>{placeItem.address_name}</span>
        </div>
      </div>
      <button className={style['button']}>글쓰기</button>
    </div>
  );
};

export default PlaceItem;
