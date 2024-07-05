import React from 'react';
import style from '../../styles/common/modal.module.scss';
import { useDisableScroll } from '../../hooks/useDiableScroll';

export type ModalType = {
  title: string;
  isVisible: boolean;
  subTitle?: string;
  confirmText?: 'delete' | 'confirm';
  cancelText?: string;
  confirmEvent?: () => void;
  cancelEvent?: () => void;
};

const Modal = (props: ModalType) => {
  useDisableScroll(props.isVisible);

  return props.isVisible ? (
    <div className={style['container']}>
      <div className={style['modal']}>
        <p className={style['title']}>{props.title}</p>
        {props.subTitle && (
          <p className={style['subtitle']}>{props.subTitle}</p>
        )}
        <div className={style['btn-container']}>
          {props.cancelEvent && props.cancelText && (
            <button onClick={props.cancelEvent} className={style['cancel-btn']}>
              {props.cancelText}
            </button>
          )}
          {props.confirmEvent && props.confirmText && (
            <button
              onClick={props.confirmEvent}
              className={
                props.confirmText === 'delete'
                  ? style['delete-btn']
                  : style['confirm-btn']
              }
            >
              {props.confirmText === 'delete' ? '삭제' : '확인'}
            </button>
          )}
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default Modal;
