import { useState, useEffect } from "react";
import axios from "axios";

/**
 * 로그인 인증 상태 관리 Custom Hook
 */
export function useAuth(config) {
  const [username, setUsername] = useState(null);
  const SBIZ_URL = config.api.sbizUrl;

  // 로그인 상태 확인
  useEffect(() => {
    if (!config.features.login) return;

    axios
      .get(`${SBIZ_URL}/api/session/check`, { withCredentials: true })
      .then((res) => {
        if (res.data.login) {
          setUsername(res.data.user_id);
        } else {
          setUsername(null);
        }
      })
      .catch(() => setUsername(null));
  }, [config.features.login, SBIZ_URL]);

  // 로그인 버튼 클릭 핸들러
  const handleLogin = () => {
    if (!username) {
      window.open(`${SBIZ_URL}`, "_blank");
      window.close();
    } else {
      alert("이미 로그인되어 있습니다.");
    }
  };

  return {
    username,
    handleLogin,
    isLoggedIn: !!username,
  };
}
