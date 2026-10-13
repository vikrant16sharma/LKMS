export interface LoginFormValues {
  email: string;
  password: string;
}

export interface RegisterFormValues {
  fullName: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  token?: string;
  accessToken?: string;
  tokenType?: string;
  user?: {
    id?: number;
    fullName?: string;
    email?: string;
    role?: string;
  };
}
