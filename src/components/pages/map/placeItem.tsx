import { PlaceListType } from '@/app/map/page';
import React from 'react';
import style from '../../../styles/pages/map/placeItem.module.scss';
import { useRouter } from 'next/navigation';
import { useSetRecoilState } from 'recoil';
import { selectedPlaceState } from '@/states/place';

type Props = {
  placeItem: PlaceListType;
  isSelected: boolean;
  clickHandler: (address: string, placeName: string) => void;
};

const PlaceItem = ({ placeItem, isSelected, clickHandler }: Props) => {
  const router = useRouter();
  const setSelectedPlace = useSetRecoilState(selectedPlaceState);
  return (
    <div
      className={
        isSelected
          ? `${style['item-container']} ${style['selected']}`
          : style['item-container']
      }
    >
      <div className={style['item-info']}>
        <img src="/images/png/place.png" alt="place" className={style['img']} />
        <div className={style['info']}>
          <span
            className={style['place']}
            onClick={() => {
              clickHandler(placeItem.address_name, placeItem.place_name);
            }}
          >
            {placeItem.place_name}
          </span>
          <span className={style['address']}>{placeItem.address_name}</span>
        </div>
      </div>
      <button
        className={style['button']}
        onClick={() => {
          localStorage.removeItem('placeName');
          localStorage.removeItem('address');
          setSelectedPlace({
            placeName: placeItem.place_name,
            address: placeItem.address_name,
          });
          localStorage.setItem('placeName', placeItem.place_name);
          localStorage.setItem('address', placeItem.address_name);
          router.push('/review/write');
        }}
      >
        글쓰기
      </button>
    </div>
  );
};

export default PlaceItem;
