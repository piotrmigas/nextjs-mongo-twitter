import { toast } from 'react-hot-toast';
import { useCallback, useState } from 'react';
import { signIn } from 'next-auth/react';
import Input from '../Input';
import Modal from './Modal';
import { closeRegisterModal, selectIsOpen } from '@/redux/slices/registerModalslice';
import { useDispatch, useSelector } from 'react-redux';
import { openLoginModal } from '@/redux/slices/loginModalSlice';
import { useRegisterUserMutation } from '@/redux/services/api';

export default function RegisterModal() {
  const dispatch = useDispatch();
  const [registerUser] = useRegisterUserMutation();

  const isOpen = useSelector(selectIsOpen);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const onToggle = useCallback(() => {
    if (isLoading) return;
    dispatch(closeRegisterModal());
    dispatch(openLoginModal());
  }, [dispatch, isLoading]);

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);
      await registerUser({
        email,
        password,
        username,
        name,
      });

      setIsLoading(false);

      toast.success('Account created.');

      signIn('credentials', {
        email,
        password,
      });

      dispatch(closeRegisterModal());
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  }, [email, password, dispatch, username, name, registerUser]);

  const body = (
    <div className='flex flex-col gap-4'>
      <Input disabled={isLoading} placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
      <Input disabled={isLoading} placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} />
      <Input
        disabled={isLoading}
        placeholder='Username'
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <Input
        disabled={isLoading}
        placeholder='Password'
        type='password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
    </div>
  );

  const footer = (
    <div className='text-neutral-400 text-center mt-4'>
      <p>
        Already have an account?{' '}
        <span onClick={onToggle} className='text-white cursor-pointer hover:underline'>
          Sign in
        </span>
      </p>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={isOpen}
      title='Create an account'
      actionLabel='Register'
      onClose={() => dispatch(closeRegisterModal())}
      onSubmit={onSubmit}
      body={body}
      footer={footer}
    />
  );
}
