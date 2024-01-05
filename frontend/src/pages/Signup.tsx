import { FormEvent, FormEventHandler, useState } from 'react';
import { useSignup } from '../hooks/useSignup';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { signup, error, isLoading }: { signup: Function, error: any, isLoading: boolean } = useSignup();
  const [isEditing, setIsEditing] = useState(true);

  const handleSubmit = (async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setIsEditing(false);
    await signup(username, password);
  }) as FormEventHandler<HTMLFormElement>;

  return (
    <form className='signup' onSubmit={handleSubmit}>
      <h3>Sign up</h3>
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

      <button disabled={isLoading}>Sign up</button>
      { !isEditing && error?.error && <div className='error'>{error.error}</div> }
    </form>
  );
};

export default Signup;
