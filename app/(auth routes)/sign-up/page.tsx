'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ErrorResponse, register, RegisterParam } from '@/lib/api/clientApi';
import { AxiosError } from 'axios';

import css from './SignUpPage.module.css';
import useAuthStore from '@/lib/store/authStore';

export default function SignUpPage() {
  const router = useRouter();
  const [error, setError] = useState('');
  const setUser = useAuthStore(state => state.setUser);
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get('email');
    const password = formData.get('password');

    try {
      if (typeof email !== 'string' || typeof password !== 'string')
        throw new Error('Email and password must be strings');
      const formValues: RegisterParam = {
        email,
        password,
      };
      const res = await register(formValues);
      if (res) {
        setUser(res);
        router.push('/profile');
      } else {
        setError('Invalid email or password');
      }
    } catch (error) {
      setError(
        (error as AxiosError<ErrorResponse>).response?.data?.message ??
          (error as Error).message ??
          'Oops... some error'
      );
    }
  };

  return (
    <main className={css.mainContent}>
      <h1 className={css.formTitle}>Sign up</h1>
      <form onSubmit={handleSubmit} className={css.form}>
        <div className={css.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            className={css.input}
            required
          />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            className={css.input}
            required
          />
        </div>

        <div className={css.actions}>
          <button type="submit" className={css.submitButton}>
            Register
          </button>
        </div>

        {error && <p className={css.error}>{error}</p>}
      </form>
    </main>
  );
}
