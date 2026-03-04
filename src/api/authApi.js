import axios from "axios";

// ✅ .env에서 자동으로 환경에 맞는 URL 불러오기
const baseURL = `${import.meta.env.VITE_SBIZ_URL}/api`;

const api = axios.create({
  baseURL,
  withCredentials: true, // 세션 쿠키 유지
});

export const login = async (loginId, password) => {
  const res = await api.post("/login", { loginId, password });
  return res.data;
};

// [백엔드 구현 필요] GET /api/session
// 로그인된 유저: { success: true, username: "홍길동" }
// 미로그인:      { success: false }
// → 연동 후 ScenarioAPage, ChatPage의 TODO 주석 참고하여 location.state 체크를 이 함수로 교체
export const checkSession = async () => {
  const res = await api.get("/session");
  return res.data;
};

export const logout = async () => {
  const res = await api.post("/logout");
  return res.data;
};

export const register = async (loginId, password) => {
  const res = await api.post("/register", { loginId, password });
  return res.data;
};