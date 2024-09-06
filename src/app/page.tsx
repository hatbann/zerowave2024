/** @format */

import Image from 'next/image';
import style from '../styles/pages/home.module.scss';
import Logo from '../../public/images/svg/logo';

export default function Home() {
  return (
    <main className={style['home-container']}>
      <section className={`${style['section']} ${style['num1']}`}>
        <img src="/images/png/img1.png" alt="img1" />
        <div className={style['text']}>
          <div className={style['top']}>
            <h4 className={style['title']}>제로 웨이브</h4>
            <p className={style['sub']}>Zero Wave</p>
          </div>
          <p className={style['desc']}>
            제로웨이브는 일상 속에서 환경보호를 실천할 수 있게 도움을 주는
            제로웨이스트 커뮤니티 서비스입니다.
          </p>
        </div>
      </section>
      <section className={`${style['section']} ${style['num2']}`}>
        <div className={style['text']}>
          <div className={style['top']}>
            <h4 className={style['title']}>우리의 지구는 건강한가요?</h4>
          </div>
          <div className={style['paragraph']}>
            <p>
              세계적으로 산업화가 확산되면서 폐기물의 양이 크게 증가하고
              있습니다. 2012년, 세계은행은 도시 인구에 의해 13억 톤의 도시
              폐기물이 생산 되었다고 발표했으며 그 수는 2025년에는 22억 톤에
              이를 것이라고 예측하고 있습니다.
            </p>
            <p>
              환경으로부터 자원은 한정되어 있는데, 전세계 인구는 점점 증가하고
              있어 이용 가능한 자원을 위해 낭비를 막는 것이 더욱 중요해진
              상황입니다. 이제 환경에 대해 고민하는 것에 머물지 않고{' '}
              <strong>실천해야 할 타이밍</strong>입니다.
            </p>
          </div>
        </div>
        <img
          src="/images/png/img2.png"
          alt="img2"
          className={style['desktop-img']}
        />
        <img
          src="/images/jpg/img2-2.jpg"
          alt="img2-2"
          className={style['mobile-img']}
        />
      </section>
      <section className={`${style['section']} ${style['num3']}`}>
        <img
          src="/images/png/img3.png"
          alt="img3"
          className={style['desktop-img']}
        />
        <img
          src="/images/jpg/img3-2.jpg"
          alt="img3-2"
          className={style['mobile-img']}
        />
        <div className={style['text']}>
          <div className={style['top']}>
            <p className={style['sub']}>Why</p>
            <h4 className={style['title']}>Zero Waste?</h4>
          </div>
          <div className={style['paragraph']}>
            <p>
              제로 웨이스트(zero waste)는 쓰레기 배출을 제로, 즉 0에 가깝게
              최소화하는 것으로 모든 제품과 포장 그리고 자재를 태우지 않고 책임
              있는 생산 및 소비 그리고 재사용과 회수를 통해 모든 자원을 보존하는
              것이 핵심입니다.
            </p>
            <p>
              제로 웨이브는 일상 속에서 제로웨이스트를 실천할 수 있는 방안을
              모색하고 많은 제로웨이스터들이 모일 수 있는 커뮤니티로서 기능해
              제로 웨이스트의 흐름이 만연한 사회의 도래를 목표로 합니다.
            </p>
            <p>제로 웨이브를 통해 환경보호에 동참해주세요</p>
          </div>
        </div>
      </section>
      <section className={`${style['section']} ${style['num4']}`}>
        <div className={style['top']}>
          <h4>Zerowave는 제로웨이스트를 실천합니다</h4>
          <h5>제로웨이스트를 위한 제로웨이브의 기능을 소개합니다</h5>
        </div>
        <div className={style['bottom']}>
          <div className={style['left']}>
            <Logo />
            <div className={style['desc']}>
              <h4>1. Wave Map</h4>
              <p>
                제로웨이스트를 실천하고 있는 공간에 대한 정보를 한 눈에 파악할
                수 있습니다. 또한 직접 용기내 챌린지가 가능한 가게에 대한 정보를
                추가할 수 있습니다.
              </p>
            </div>
          </div>
          <div className={style['right']}>
            <div className={style['util']}>
              <h4>2. 제로 웨이스트 샵 정보 제공</h4>
              <p>
                제로웨이스트를 실천하고 있는 공간에 대한 정보를 한 눈에 파악할
                수 있습니다.
              </p>
            </div>
            <div className={style['util']}>
              <h4>3. 용기내 챌린지 샵 리뷰 작성</h4>
              <p>용기내 챌린지가 가능한 가게에 대한 리뷰를 작성해보세요</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
