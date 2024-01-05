import { useAuthContext } from './useAuthContext';
import { AuthActionType } from '../context/AuthContext';

export const useLogout = () => {
  const { dispatch } = useAuthContext();

  const logout = () => {
    // Remove user from storage
    localStorage.removeItem('user');
    
    // Dispatch logout action
    dispatch({
      type: AuthActionType.LOGOUT,
      payload: null,
    });
  };

  return { logout };
};
