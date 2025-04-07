export function useAuth() {
    const storage = window.localStorage;
    const token = storage.getItem("token");
  
    if (!token) return { token: null, username: null };
  
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return { token, username: payload.username };
    } catch (err) {
      console.error("Invalid token format", err);
      return { token: null, username: null };
    }
}
  