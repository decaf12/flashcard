import { FormEvent, FormEventHandler, useState } from 'react';
import { useLogin } from '../hooks/useLogin';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login, error, isLoading }: { login: Function, error: any, isLoading: boolean } = useLogin();
  const [isEditing, setIsEditing] = useState(true);

  const handleSubmit = (async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setIsEditing(false);
    await login(username, password);
  }) as FormEventHandler<HTMLFormElement>;

  return (
    <form className='Login' onSubmit={handleSubmit}>
      <h3>Log in</h3>
      <label>Username:</label>
      <input
        type='text'
        onChange={(e) => {
          setIsEditing(true);
          setUsername(e.target.value);
        }}
        value={username}
      />
      
      <label>Password:</label>
      <input
        type='password'
        onChange={(e) => {
          setIsEditing(true);
          setPassword(e.target.value);
        }}
        value={password}
      />

      <button disabled={isLoading}>Log in</button>
      { !isEditing && error?.error && <div className='error'>{error.error}</div> }
    </form>
  );
};

export default Login;
