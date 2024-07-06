'use client';

import React, { useEffect, useState } from 'react';
import style from '../../styles/pages/map/style.module.scss';

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

const page = () => {
  const [map, setMap] = useState<any>(null);

  const onSuccessLoadLoc = (location: {
    coords: { latitude: number; longitude: number };
  }) => {
    const kakaoMapScript = document.createElement('script');
    kakaoMapScript.async = false;
    kakaoMapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=700d399006256f95732f06b19c046ba5&autoload=false&libraries=services`;
    document.head.appendChild(kakaoMapScript);

    const onLoadKakaoAPI = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById('map');
        const options = {
          center: new window.kakao.maps.LatLng(
            location.coords.latitude,
            location.coords.longitude
          ),
          level: 3,
        };

        const map = new window.kakao.maps.Map(container, options);
        setMap(map);
        const ps = new window.kakao.maps.services.Places(map);
        const infowindow = new window.kakao.maps.InfoWindow({ zIndex: 1 });

        // 카테고리로 은행을 검색합니다
        ps.categorySearch('FD6', placesSearchCB, { useMapBounds: true });

        // 키워드 검색 완료 시 호출되는 콜백함수 입니다
        function placesSearchCB(data: any, status: any, pagination: any) {
          console.log(status);
          if (status === window.kakao.maps.services.Status.OK) {
            for (let i = 0; i < data.length; i++) {
              console.log(data);
              displayMarker(data[i]);
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
            infowindow.open(map, marker);
          });
        }
      });
    };

    kakaoMapScript.addEventListener('load', onLoadKakaoAPI);
  };

  useEffect(() => {
    if (map) {
    }
  }, [map]);

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

  return (
    <div className={style['container']}>
      <h1>ZEROWAVE MAP</h1>
      <div className={style['map-container']}>
        <div className={style['location-lists']}></div>
        <div
          id="map"
          style={{ width: '100%', height: '100%' }}
          className={style['map']}
        >
          d
        </div>
      </div>
    </div>
  );
};

export default page;
