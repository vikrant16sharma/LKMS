import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { AUTH_TOKEN_KEY } from '../services/api';
import { login } from '../services/auth';
import type { LoginFormValues } from '../types/auth';

export function LoginPage() {
  const [form, setForm] = useState<LoginFormValues>({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await login(form);
      const token = response.token ?? response.accessToken;

      if (!token) {
        throw new Error('Authentication token missing from response');
      }

      localStorage.setItem(AUTH_TOKEN_KEY, token);
      navigate('/');
    } catch (error) {
      console.error(error);
      alert('Invalid email or password');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-100 via-white to-slate-100 px-4 py-10">
      <div className="w-full max-w-md rounded-[2rem] border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/60">
        <div className="mb-8 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-brand-600">AlgoAtlas</p>
          <h1 className="mt-4 text-3xl font-semibold text-slate-900">Login to your account</h1>
        </div>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Email</label>
            <Input name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@example.com" />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Password</label>
            <Input name="password" type="password" value={form.password} onChange={handleChange} placeholder="Enter your password" />
          </div>
          <Button type="submit" className="w-full">Sign In</Button>
        </form>
        <p className="mt-6 text-center text-sm text-slate-600">
          New to AlgoAtlas?{' '}
          <Link to="/register" className="font-semibold text-brand-600 hover:text-brand-700">
            Create account
          </Link>
        </p>
      </div>
    </div>
  );
}
