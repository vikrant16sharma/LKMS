import { useState } from 'react';
import { login as loginRequest, register as registerRequest } from '../services/auth';
import type { LoginFormValues, RegisterFormValues } from '../types/auth';

const AUTH_TOKEN_KEY = 'algoatlas_token';

export function useAuth() {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem(AUTH_TOKEN_KEY));

  const login = async (data: LoginFormValues) => {
    const response = await loginRequest(data);
    localStorage.setItem(AUTH_TOKEN_KEY, response.token);
    setToken(response.token);
  };

  const register = async (data: RegisterFormValues) => {
    const response = await registerRequest(data);
    localStorage.setItem(AUTH_TOKEN_KEY, response.token);
    setToken(response.token);
  };

  const logout = () => {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    setToken(null);
  };

  return { token, login, register, logout };
}
