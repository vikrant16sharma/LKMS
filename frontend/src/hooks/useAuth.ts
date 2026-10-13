import { useState } from 'react';
import { login as loginRequest, register as registerRequest } from '../services/auth';
import { AUTH_TOKEN_KEY } from '../services/api';
import type { LoginFormValues, RegisterFormValues } from '../types/auth';

export function useAuth() {
  const [token, setToken] = useState<string | null>(() => {
    if (typeof window === 'undefined') {
      return null;
    }
    return localStorage.getItem(AUTH_TOKEN_KEY);
  });

  const persistToken = (nextToken: string | null) => {
    if (nextToken) {
      localStorage.setItem(AUTH_TOKEN_KEY, nextToken);
      setToken(nextToken);
      return;
    }

    localStorage.removeItem(AUTH_TOKEN_KEY);
    setToken(null);
  };

  const login = async (data: LoginFormValues) => {
    const response = await loginRequest(data);
    const nextToken = response.token ?? response.accessToken ?? null;
    persistToken(nextToken);
  };

  const register = async (data: RegisterFormValues) => {
    const response = await registerRequest(data);
    const nextToken = response.token ?? response.accessToken ?? null;
    persistToken(nextToken);
  };

  const logout = () => {
    persistToken(null);
  };

  return { token, login, register, logout };
}
