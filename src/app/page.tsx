import Image from 'next/image';
import style from '../styles/pages/home.module.scss';

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
              이를 것이라고 예측하고 있습니다. 그리고 고형 폐기물의 생산량
              증가는 쓰레기 매립장의 필요성을 증가시킵니다. 쓰레기 매립지에서
              나오는 침출수에서 가정용 화학물질과 처방 약이 다량 포함되어
              있습니다. 이 때문에 화학물질이나 약품이 지하수나 그 주변 환경에
              유입될 가능성이 제기되어 큰 우려를 야기하고 있습니다.
            </p>
            <p>
              환경으로부터 자원은 한정되어 있는데, 전세계 인구는 점점 증가하고
              있는데 따라서 이용 가능한 자원을 위해 낭비를 막는 것이 더욱
              중요해진 상황입니다. 이제 환경에 대해 고민하는 것에 머물지 않고
              실천해야 할 타이밍입니다.
            </p>
          </div>
        </div>
        <img src="/images/png/img2.png" alt="img2" />
      </section>
      <section className={`${style['section']} ${style['num3']}`}>
        <img src="/images/png/img3.png" alt="img3" />
        <div className={style['text']}>
          <div className={style['top']}>
            <p className={style['sub']}>Why</p>
            <h4 className={style['title']}>Zero Waste?</h4>
          </div>
          <div className={style['paragraph']}>
            <p>
              제로 웨이스트(zero waste)는 모든 제품, 포장 및 자재를 태우지 않고,
              재사용될 수 있도록 하는 것이 목표로 하는 것 입니다. 즉, 환경이나
              인간의 건강을 위협할 수 있는 토지, 해양, 공기로 배출하지 않고
              생산, 소비, 재사용 및 회수를 통해 모든 자원을 보존 및 재활용하는
              것 입니다. 제로 웨이스트를 통해 폐기물을 제거하면 환경 오염을 줄일
              수 있고, 또한 원자재에 대한 필요성이 줄어들기 때문에 비용도 절감할
              수 있습니다.
            </p>
            <p>
              제로 웨이브는 일상 속에서 제로웨이스트를 실천할 수 있는 방안을
              모색하고 많은 제로웨이스터들이 모일 수 있는 커뮤니티로서 기능해
              제로 웨이스트의 흐름이 만연한 사회의 도래를 목표로 합니다.{' '}
            </p>
            <p>제로 웨이브를 통해 환경보호에 동참해주세요</p>
          </div>
        </div>
      </section>
      <section className={`${style['section']} ${style['num4']}`}>
        <div className={style['top']}>
          <h4>Zero Wave는 제로웨이스트를 실천합니다</h4>
          <h5>제로웨이스트를 위한 제로웨이브의 기능을 소개합니다</h5>
        </div>
        <div className={style['bottom']}>
          <div className={style['left']}>
            <img src="/images/png/logo.png" alt="logo" />
            <h4>Wave Map</h4>
            <p>
              제로웨이스트를 실천하고 있는 공간에 대한 정보를 한 눈에 파악할 수
              있습니다. 또한 직접 용기내 챌린지가 가능한 가게에 대한 정보를
              추가할 수 있습니다.
            </p>
          </div>
          <div className={style['right']}>
            <div className={style['util']}>
              <h4>제로 웨이스트 샵 정보 제공</h4>
              <p>
                제로웨이스트를 실천하고 있는 공간에 대한 정보를 한 눈에 파악할
                수 있습니다.
              </p>
            </div>
            <div className={style['util']}>
              <h4>직접 용기내 챌린지 샵 정보 추가</h4>
              <p>용기내 챌린지가 가능한 가게에 대한 정보를 추가해보세요</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
