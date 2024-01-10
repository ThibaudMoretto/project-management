import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { useLoginMutation } from '../../store/user';

export const useLogin = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState<string>();

  const [login] = useLoginMutation();

  const handleLogin = async (loginData: {
    email: string;
    password: string;
  }) => {
    try {
      login({
        email: loginData.email,
        password: loginData.password,
      }).then(response => {
        if ('error' in response) {
          console.log('response.error');

          if ('status' in response.error) {
            return setErrorMessage(t('login.invalidCredentials') as string);
          }
        } else {
          return navigate('/');
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  return { errorMessage, handleLogin };
};
