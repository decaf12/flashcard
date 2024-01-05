import { FormEvent, FormEventHandler, useState } from 'react';
import { useSignup } from '../hooks/useSignup';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signup, error, isLoading }: { signup: Function, error: any, isLoading: boolean } = useSignup();

  const handleSubmit = (async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    await signup(email, password);
  }) as FormEventHandler<HTMLFormElement>;

  return (
    <form className='signup' onSubmit={handleSubmit}>
      <h3>Sign up</h3>
      <label>Email:</label>
      <input
        type='email'
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      
      <label>Password:</label>
      <input
        type='password'
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />

      <button disabled={isLoading}>Sign up</button>
      { error?.error && <div className='error'>{error.error}</div> }
    </form>
  );
};

export default Signup;
