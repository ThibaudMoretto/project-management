import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { useGetUserQuery } from 'store/user';

import { useLogin } from './useLogin';

import styles from './Login.module.scss';

export function Login() {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const { errorMessage, handleLogin } = useLogin();

  const methods = useForm<{
    email: string;
    password: string;
  }>();

  const { data: { role } = {} } = useGetUserQuery();

  useEffect(() => {
    if (role) {
      navigate('/');
    }
  }, [role]);

  return (
    <div className={styles.login}>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(handleLogin)}>
          <h1>Accéder à votre espace</h1>
          <input type="text" {...methods.register('email')} />
          <input type="password" {...methods.register('password')} />

          {errorMessage && <div className="errorMessage">{errorMessage}</div>}

          <button type="submit">{t('login.login')}</button>
        </form>
      </FormProvider>
    </div>
  );
}
