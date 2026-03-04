import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import mainbot from '../../assets/Gaibot.svg'
import proceedings from '../../assets/proceedings.svg'
import company from '../../assets/company.svg'
import Business_Proposal from '../../assets/Business_Proposal.svg'
import newChat from '../../assets/chating.svg'
import styles from './ScenarioAPage.module.css'

import exit from '../../assets/exit.svg'

const ScenarioAPage = () => {
  const navigate = useNavigate()
  const location = useLocation()

  // [TODO: 백엔드 연동 시 수정 필요]
  // 현재: 로그인 페이지를 거쳐왔는지 location.state로 임시 체크 (새로고침 시 풀림)
  // 변경 후: location.state 체크 대신 아래 방식으로 교체
  //
  //   import { checkSession } from '../../api/authApi'
  //   const res = await checkSession()   // GET /api/session
  //   if (!res.success) { navigate('/', { replace: true }); return null }
  //
  // 백엔드에서 GET /api/session 구현 필요 → 로그인된 유저면 { success: true }, 아니면 { success: false }
  const skipAuth = import.meta.env.VITE_DEV_SKIP_AUTH === 'true'
  if (!skipAuth && !location.state?.fromLogin) {
    navigate('/', { replace: true })
    return null
  }

  return (
    <div className={styles.mainPage}>
      <img src={mainbot} alt="Main Bot" />
      <h1 className={styles.title}>원하시는 업무 종류를 선택해주세요</h1>
      <div className={styles.buttonContainer}>
      <button onClick={() => navigate('/chat', { state: { fromScenario: true } })} className={styles.scenarioButton}>
        <img src={proceedings} alt="회의록 아이콘" className={styles.scenarioIcon} />회의록
      </button>
      <button onClick={() => navigate('/chat', { state: { fromScenario: true } })} className={styles.scenarioButton}>
        <img src={company} alt="회사내규 아이콘" className={styles.scenarioIcon} />회사내규
      </button>
      <button onClick={() => navigate('/chat', { state: { fromScenario: true } })} className={styles.scenarioButton}>
        <img src={Business_Proposal} alt="사업계획서" className={styles.scenarioIcon} />사업계획서
      </button>
      <button onClick={() => navigate('/chat', { state: { fromScenario: true } })} className={styles.scenarioButton}>
        <img src={newChat} alt="Q&A" className={styles.scenarioIcon} />Q&A
      </button>
      </div>      
    </div>
  )
}

export default ScenarioAPage