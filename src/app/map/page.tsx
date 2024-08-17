'use client';

import React, { useEffect, useState } from 'react';
import style from '../../styles/pages/map/style.module.scss';
import PlaceItem from '@/components/pages/map/placeItem';

declare global {
  interface Window {
    kakao: any;
  }
}

type locationType = {
  loaded: boolean;
  cordinates?: { lat: number; lng: number };
  errors?: { code: number; message: string };
};

export type PlaceListType = {
  address_name: string;
  place_name: string;
  id: number;
};

const page = () => {
  const [map, setMap] = useState<any>(null);
  const [geocoder, setGeocoder] = useState<any>(null);
  const [placeLists, setPlaceLists] = useState<PlaceListType[]>([]);
  const [selectedId, setSelectedId] = useState(-1);
  const [category, setCategory] = useState<'restaurant' | 'cafe'>('restaurant');

  const onSuccessLoadLoc = (location: {
    coords: { latitude: number; longitude: number };
  }) => {
    const kakaoMapScript = document.createElement('script');
    kakaoMapScript.async = false;
    kakaoMapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=700d399006256f95732f06b19c046ba5&autoload=false&libraries=services`;
    document.head.appendChild(kakaoMapScript);

    const onLoadKakaoAPI = () => {
      window.kakao.maps.load(() => {
        tempF(location.coords.latitude, location.coords.longitude, 3);
      });
    };

    kakaoMapScript.addEventListener('load', onLoadKakaoAPI);
  };

  const tempF = (lat: number, lng: number, level: number) => {
    const container = document.getElementById('map');
    const options = {
      center: new window.kakao.maps.LatLng(lat, lng),
      level: level,
    };

    const map = new window.kakao.maps.Map(container, options);
    setMap(map);
    const ps = new window.kakao.maps.services.Places(map);
    const infowindow = new window.kakao.maps.InfoWindow({ zIndex: 1 });

    console.log(category);
    // 카테고리로 은행을 검색합니다
    if (category === 'restaurant') {
      ps.categorySearch('FD6', placesSearchCB, { useMapBounds: true });
    } else {
      ps.categorySearch('CE7', placesSearchCB, { useMapBounds: true });
    }

    // 키워드 검색 완료 시 호출되는 콜백함수 입니다
    function placesSearchCB(data: any, status: any, pagination: any) {
      if (status === window.kakao.maps.services.Status.OK) {
        console.log(data);
        for (let i = 0; i < data.length; i++) {
          displayMarker(data[i]);
          setPlaceLists((prev) => [
            ...prev,
            {
              address_name: data[i].address_name,
              place_name: data[i].place_name,
              id: data[i].id,
            },
          ]);
        }
      }
    }

    function displayMarker(place: any) {
      // 마커를 생성하고 지도에 표시합니다
      var marker = new window.kakao.maps.Marker({
        map: map,
        position: new window.kakao.maps.LatLng(place.y, place.x),
      });

      // 마커에 클릭이벤트를 등록합니다
      window.kakao.maps.event.addListener(marker, 'click', function () {
        // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
        infowindow.setContent(
          '<div style="padding:5px;font-size:12px;">' +
            place.place_name +
            '</div>'
        );
        setSelectedId(place.id);
        infowindow.open(map, marker);
      });
    }
  };

  const handleCenterChanged = (map: any) => {
    setPlaceLists([]);
    const level = map.getLevel();

    // 지도의 중심좌표를 얻어옵니다
    const latlng = map.getCenter();
    console.log(latlng);
    tempF(latlng.Ma, latlng.La, level);
  };

  useEffect(() => {
    if (map) {
      window.kakao.maps.event.addListener(map, 'dragend', () =>
        handleCenterChanged(map)
      );
      window.kakao.maps.event.addListener(map, 'zoom_changed', () =>
        handleCenterChanged(map)
      );

      const tempGeocoder = new window.kakao.maps.services.Geocoder();
      setGeocoder(tempGeocoder);
    }
  }, [map, category]);

  useEffect(() => {
    if (map) {
      handleCenterChanged(map);
    }
  }, [category]);

  const onErrorLoadLoc = (error: { code: number; message: string }) => {
    const kakaoMapScript = document.createElement('script');
    kakaoMapScript.async = false;
    kakaoMapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=700d399006256f95732f06b19c046ba5&autoload=false`;
    document.head.appendChild(kakaoMapScript);

    const onLoadKakaoAPI = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById('map');
        const options = {
          center: new window.kakao.maps.LatLng(33.450701, 126.570667),
          level: 3,
        };
        const map = new window.kakao.maps.Map(container, options);
      });
    };

    kakaoMapScript.addEventListener('load', onLoadKakaoAPI);
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        onSuccessLoadLoc,
        onErrorLoadLoc
      );
    }
  }, []);

  const clickAddress = (address: string, placeName: string) => {
    console.log(address);

    geocoder.addressSearch(address, function (result: any, status: any) {
      // 정상적으로 검색이 완료됐으면
      if (status === window.kakao.maps.services.Status.OK) {
        var coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);
        console.log(coords);
        // 결과값으로 받은 위치를 마커로 표시합니다

        var customOverlay = new window.kakao.maps.CustomOverlay({
          position: coords,
          content: `<div class=${style['focus']}>${placeName}</div>`,
        });

        // 커스텀 오버레이를 지도에 표시합니다
        customOverlay.setMap(map);

        // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
        map.setCenter(coords);
      }
    });
  };

  return (
    <div className={style['container']}>
      <div className={style['top']}>
        <div className={style['title']}>
          <h1>Zerowave Map</h1>
          <img src="/images/png/Location.png" alt="location" />
        </div>
        <p>제로웨이스트를 실천하는 공간들을 추가해주세요</p>
      </div>
      <div className={style['map-container']}>
        <div className={style['location-lists']}>
          <div className={style['btn-container']}>
            <button
              onClick={() => {
                setCategory('restaurant');
              }}
              className={category === 'restaurant' ? style['selected'] : ''}
            >
              음식점
            </button>
            <button
              onClick={() => {
                setCategory('cafe');
              }}
              className={category === 'cafe' ? style['selected'] : ''}
            >
              카페
            </button>
          </div>
          {placeLists.map((place) => (
            <PlaceItem
              clickHandler={clickAddress}
              placeItem={place}
              isSelected={place.id === selectedId}
            />
          ))}
        </div>
        <div
          id="map"
          style={{ width: '100%', height: '100%' }}
          className={style['map']}
        ></div>
      </div>
    </div>
  );
};

export default page;
