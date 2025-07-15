import jwt_decode from "jwt-decode";

export function isTokenValid(token) {
  if (!token) return false;

  try {
    const decoded = jwt_decode(token);
    const now = Date.now() / 1000; // saniye cinsinden şimdiki zaman
    if (decoded.exp && decoded.exp < now) {
      return false; // token süresi dolmuş
    }
    return true;
  } catch {
    return false; // decode edilemezse geçersiz say
  }
}

