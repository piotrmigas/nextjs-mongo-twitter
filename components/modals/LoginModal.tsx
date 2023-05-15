import { signIn } from 'next-auth/react';
import { useCallback, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { openRegisterModal } from '@/redux/slices/registerModalslice';
import { closeLoginModal, selectIsOpen } from '@/redux/slices/loginModalSlice';
import Input from '../Input';
import Modal from './Modal';

export default function LoginModal() {
  const dispatch = useDispatch();
  const isOpen = useSelector(selectIsOpen);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);

      await signIn('credentials', {
        email,
        password,
      });

      toast.success('Logged in');

      dispatch(closeLoginModal());
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  }, [email, password, dispatch]);

  const onToggle = useCallback(() => {
    dispatch(closeLoginModal());
    dispatch(openRegisterModal());
  }, [dispatch]);

  const body = (
    <div className='flex flex-col gap-4'>
      <Input placeholder='Email' onChange={(e) => setEmail(e.target.value)} value={email} disabled={isLoading} />
      <Input
        placeholder='Password'
        type='password'
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        disabled={isLoading}
      />
    </div>
  );

  const footer = (
    <div className='text-neutral-400 text-center mt-4'>
      <p>
        First time using Twitter?{' '}
        <span onClick={onToggle} className='text-white cursor-pointer hover:underline'>
          Create an account
        </span>
      </p>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={isOpen}
      title='Login'
      actionLabel='Sign in'
      onClose={() => dispatch(closeLoginModal())}
      onSubmit={onSubmit}
      body={body}
      footer={footer}
    />
  );
}
