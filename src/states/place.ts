import { PlaceType } from '@/types/boardType';
import { atom } from 'recoil';

export const selectedPlaceState = atom<PlaceType>({
  key: 'selectedPlace',
  default: {
    placeName: undefined,
    address: undefined,
  },
});
