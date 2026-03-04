import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '../../api/authApi'
import mainbot from '../../assets/Gaibot.svg'
import styles from './LoginPage.module.css'
import closeIcon from '../../assets/eye-closed.svg'
import openIcon from '../../assets/eye-open.svg'

const LoginPage = () => {
  const navigate = useNavigate()
  const [loginId, setLoginId] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!loginId.trim() || !password.trim()) {
      setError('아이디와 비밀번호를 입력해주세요.')
      return
    }

    try {
      const res = await login(loginId, password)
      if (res.success) {
        navigate('/scenario', { state: { fromLogin: true } })
      } else {
        setError(res.message || '로그인에 실패했습니다.')
      }
    } catch (err) {
      setError('로그인 중 오류가 발생했습니다.')
    }
  }

  return (
    <div className={styles.loginPage}>
      <img src={mainbot} alt="Gaibot" className={styles.logo} />
      <h1 className={styles.title}>로그인</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          placeholder="아이디"
          value={loginId}
          onChange={(e) => setLoginId(e.target.value)}
          className={styles.input}
        />
        <div className={styles.passwordWrapper}>
          <input type={showPassword ? 'text' : 'password'} placeholder="비밀번호" value={password} onChange={(e) => setPassword(e.target.value)} className={styles.input}/>
          <button type="button" onClick={() => setShowPassword(!showPassword)} className={styles.passwordToggle}>
            {showPassword ? <img src={closeIcon} alt="비밀번호 숨기기" /> : <img src={openIcon} alt="비밀번호 보기" />}
          </button>
        </div>
        {error && <p className={styles.error}>{error}</p>}
        <button type="submit" className={styles.loginButton}>로그인</button>
      </form>
      <p className={styles.registerLink}>
        계정이 없으신가요? <span onClick={() => navigate('/register')}>회원가입</span>
      </p>
    </div>
  )
}

export default LoginPage
