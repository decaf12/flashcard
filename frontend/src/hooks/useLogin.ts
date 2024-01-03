import { useAuthContext } from './useAuthContext';
import { useState } from 'react';
import axios from 'axios';
import AuthHttpRequest from  '../httpRequests/auth';
import { User } from '../../../backend/models/userModel';
import { AuthActionType } from '../context/AuthContext';

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();

  const login = async (username: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await AuthHttpRequest.login({ username, password } as User);
      const json = response.data;
      // Save user to local storage
      localStorage.setItem('user', JSON.stringify(json));
      dispatch({
        type: AuthActionType.LOGIN,
        payload: username,
      });
      setIsLoading(false);
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.data) {
        setIsLoading(false);
        setError(err.response.data);
      }
    }
  };

  return { login, isLoading, error };
};
