import { useEffect } from 'react';

export function useDisableScroll(disable: boolean = true) {
  let currScrollY = globalThis.scrollY;

  const disableBodyScrollWithScrollbar = (scrollY: number) => {
    const { style } = document.body;
    // style.overflow = "scroll"; // 세로 스크롤바 유지
    style.overflow = 'hidden';
    style.position = 'fixed'; // 세로 스크롤 금지
    style.touchAction = 'none'; // 터치 동작 금지
    style.top = `${-scrollY}px`; // fixed 값에 대한 top 지정
  };

  const enableBodyScroll = (top: number) => {
    const { style } = document.body;
    style.overflow = 'auto';
    style.position = 'static';
    style.touchAction = 'pan-y';
    window.scrollTo({ top });
    style.top = 'unset';
  };

  useEffect(() => {
    if (disable) {
      disableBodyScrollWithScrollbar(currScrollY);
    }
    return () => {
      enableBodyScroll(currScrollY);
    };
  }, [disable]);
}
