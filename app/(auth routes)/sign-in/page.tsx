'use client';

import css from './SignInPage.module.css';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ErrorResponse, login, LoginParam } from '@/lib/api/clientApi';
import { AxiosError } from 'axios';
import useAuthStore from '@/lib/store/authStore';

export default function SignInPage() {
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
      const formValues: LoginParam = {
        email,
        password,
      };

      const user = await login(formValues);
      setUser(user);
      router.push('/profile');
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
      <form onSubmit={handleSubmit} className={css.form}>
        <h1 className={css.formTitle}>Sign in</h1>

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
            Log in
          </button>
        </div>

        {error && <p className={css.error}>{error}</p>}
      </form>
    </main>
  );
}
