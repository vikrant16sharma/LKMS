import type { AuthResponse, LoginFormValues, RegisterFormValues } from '../types/auth';
import { fetcher } from './api';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8080/api';

export async function login(data: LoginFormValues): Promise<AuthResponse> {
  return fetcher<AuthResponse>(`${API_BASE}/auth/login`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function register(data: RegisterFormValues): Promise<AuthResponse> {
  return fetcher<AuthResponse>(`${API_BASE}/auth/register`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}
