'use client';
import { useState } from 'react';
import Image from 'next/image';
import styles from './AuthForm.module.scss';
import { useAuth } from '../model/useAuth';
import googleIcon from '@/shared/imgs/google.svg';
import appleIcon from '@/shared/imgs/apple.svg';
import vkIcon from '@/shared/imgs/vk.svg';

export const AuthForm = () => {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { session, loginWithCredentials, loginWithProvider, logout } =
    useAuth();

  if (session) {
    return (
      <div className={styles.authForm}>
        <h2>Привет, {session.user?.name || 'Пользователь'}!</h2>
        <p>{session.user?.email}</p>
        <button onClick={logout}>Выйти</button>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await loginWithCredentials(email, password);
  };

  return (
    <div className={styles.authForm}>
      <div className={styles.authForm__tabs}>
        <button
          onClick={() => setMode('login')}
          className={mode === 'login' ? styles.active : ''}
        >
          Вход
        </button>
        <button
          onClick={() => setMode('register')}
          className={mode === 'register' ? styles.active : ''}
        >
          Регистрация
        </button>
      </div>

      <form onSubmit={handleSubmit} className={styles.authForm__form}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">
          {mode === 'login' ? 'Войти' : 'Зарегистрироваться'}
        </button>
      </form>

      <div className={styles.authForm__social}>
        <button onClick={() => loginWithProvider('google')}>
          <Image src={googleIcon} alt="Google" width={20} height={20} />
        </button>
        <button onClick={() => loginWithProvider('vk')}>
          <Image src={vkIcon} alt="VK" width={20} height={20} />
        </button>
        <button onClick={() => loginWithProvider('apple')}>
          <Image src={appleIcon} alt="Apple" width={20} height={20} />
        </button>
      </div>
    </div>
  );
};
