import React from 'react'
import { Layout } from '../components/layout'
import { Seo } from '../components/seo'
import './index.scss'

const Home = () => (
  <Layout pageName="home">
    <Seo title="소개" />
    <div className="home-container is-flex is-direction-column">
      <div className="home-title">
        오아시스<span>.</span>
      </div>
      <div className="home-sub-title">김정윤의 개발블로그</div>
      <div className="home-intro">대화를 즐기는 개발자 김정윤입니다.</div>
      <div className="home-intro">만나 뵙게 되어 반갑습니다.</div>
      <div className="home-sub-intro">
        웹 개발을 즐겨합니다. 개발자로서 더 좋은 코드, 더 좋은 설계, 더 좋은
        서비스를 위하여 구성원들과 원활하게 소통하는 것이 중요하다고 생각합니다.
        <br />
        코드 리뷰 등과 같은 교류를 통해 피드백 받는 것을 좋아하며 서로 발전해
        나갈 수 있는 환경을 선호합니다.
      </div>
      <div className="home-sub-intro">
        협업 속에서 내가 맡은 부분을 완벽히 수행해냈을 때 오는 만족감을 중요시
        여기며 나와 나의 팀이 작성한 코드로 비즈니스적 가치를 창출해 내고
        싶습니다.
        <br />
        그러기 위해 Best Practice가 무엇일지 생각해 보며 꾸준한 프로젝트진행과
        커밋을 통하여 오늘보다 내일 더 성장하는 개발자가 되기 위해 노력합니다.
      </div>
      <div className="home-info">
        <div>Contact.</div>
        <div>jeongyunniim@gmail.com</div>
        <div>Channel.</div>
        <div>
          <a href="https://github.com/je0ngyun">github.com/je0ngyun</a>
        </div>
      </div>
    </div>
  </Layout>
)

export default Home
