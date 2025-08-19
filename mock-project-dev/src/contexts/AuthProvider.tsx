import React, { createContext, useContext, useEffect, useState } from "react";
import { api, saveToken, clearToken, getToken } from "../lib/api";

type User = { id: number | string; email: string; name?: string };

type AuthCtx = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name?: string) => Promise<void>;
  googleLogin: (credential: string) => Promise<void>;
  logout: () => void;
};

const Ctx = createContext<AuthCtx | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Khôi phục phiên nếu có token
  useEffect(() => {
    (async () => {
      try {
        const token = getToken?.();
        if (token) {
          // Nếu backend có /me thì dùng; nếu không, có thể giải mã từ token/localStorage
          const { data } = await api.get("/me");
          setUser(data.user);
        }
      } catch {
        clearToken?.();
        setUser(null);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const normalizeError = (
    err: any,
    fallback = "Đã có lỗi, vui lòng thử lại"
  ) => {
    const msg =
      err?.response?.data?.error ||
      err?.response?.data?.message ||
      err?.message ||
      err;
    return typeof msg === "string" ? msg : fallback;
  };

  const login = async (email: string, password: string) => {
    try {
      const { data } = await api.post("/login", { email, password });
      saveToken?.(data.accessToken);
      setUser(data.user);
    } catch (err: any) {
      // QUAN TRỌNG: ném lỗi để UI hiển thị
      throw new Error(normalizeError(err, "Thông tin đăng nhập không đúng"));
    }
  };

  const register = async (email: string, password: string, name?: string) => {
    try {
      const { data } = await api.post("/register", { email, password, name });
      saveToken?.(data.accessToken);
      setUser(data.user);
    } catch (err: any) {
      throw new Error(normalizeError(err, "Không thể tạo tài khoản"));
    }
  };

  const googleLogin = async (credential: string) => {
    console.log("[Auth] POST /auth/google"); // 👈
    try {
      const { data } = await api.post("/auth/google", { credential });
      saveToken(data.accessToken);
      setUser(data.user);
    } catch (err: any) {
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "Đăng nhập Google thất bại";
      console.error("[Auth] googleLogin error:", msg); // 👈
      throw new Error(msg);
    }
  };

  const logout = () => {
    clearToken?.();
    setUser(null);
  };

  const value: AuthCtx = {
    user,
    loading,
    login,
    register,
    googleLogin,
    logout,
  };
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
};

// Hook an toàn: nếu dùng ngoài Provider sẽ báo lỗi rõ ràng
export const useAuth = () => {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
