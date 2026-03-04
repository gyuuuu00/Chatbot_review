import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { register } from '../../api/authApi'
import mainbot from '../../assets/Gaibot.svg'
import styles from './Register.module.css'
import closeIcon from '../../assets/eye-closed.svg'
import openIcon from '../../assets/eye-open.svg'

const Register = () => {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false)

// 데이터베이스 컬럼 u_login_id, u_login_pwd, u_name, u_depart은 api변환 예정 - 다른폴더로(api/authApi.js)
  const [u_login_id, setLoginId] = useState('')
  const [u_name, setName] = useState('')
  const [u_login_pwd, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [u_depart, setDepart] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!u_login_id.trim() || !u_login_pwd.trim() || !passwordConfirm.trim() || !u_depart.trim()) {
      setError('모든 항목을 입력해주세요.')
      return
    }

    if (u_login_pwd !== passwordConfirm) {
      setError('비밀번호가 일치하지 않습니다.')
      return
    }

    try {
      const res = await register(u_login_id, u_login_pwd, u_depart)
      if (res.success) {
        alert('회원가입이 완료되었습니다.')
        navigate('/')
      } else {
        setError(res.message || '회원가입에 실패했습니다.')
      }
    } catch (err) {
      setError('회원가입 중 오류가 발생했습니다.')
    }
  }


  return (
    <div className={styles.registerPage}>
      <img src={mainbot} alt="Gaibot" className={styles.logo} />
      <h1 className={styles.title}>회원가입</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input type="text" placeholder="아이디" value={u_login_id}onChange={(e) => setLoginId(e.target.value)} className={styles.input}/>
        <input type="text" placeholder="이름" value={u_name}onChange={(e) => setName(e.target.value)} className={styles.input}/>
        <div className={styles.passwordWrapper}>
          <input type={showPassword ? 'text' : 'password'} placeholder="비밀번호" value={u_login_pwd} onChange={(e) => setPassword(e.target.value)} className={styles.input}/>
          <button type="button" onClick={() => setShowPassword(!showPassword)} className={styles.passwordToggle}>
            {showPassword ? <img src={closeIcon} alt="비밀번호 숨기기" /> : <img src={openIcon} alt="비밀번호 보기" />}
          </button>
        </div>
        <div className={styles.passwordWrapper}>
          <input type={showPasswordConfirm ? 'text' : 'password'} placeholder="비밀번호 확인" value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} className={styles.input}/>
          <button type="button" onClick={() => setShowPasswordConfirm(!showPasswordConfirm)} className={styles.passwordToggle}>
            {showPasswordConfirm ? <img src={closeIcon} alt="비밀번호 숨기기" /> : <img src={openIcon} alt="비밀번호 보기" />}
          </button>
        </div>
        <input type="text" placeholder="부서" value={u_depart} onChange={(e) => setDepart(e.target.value)} className={styles.input}/>{error && <p className={styles.error}>{error}</p>}
            <button type="submit" className={styles.registerButton}>회원가입</button>
      </form>

      <p className={styles.loginLink}>
        이미 계정이 있으신가요? <span onClick={() => navigate('/')}>로그인</span>
      </p>

    </div>
  )
}

export default Register