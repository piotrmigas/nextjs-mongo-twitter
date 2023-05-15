import { useRouter } from 'next/navigation';
import { FaFeather } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { openLoginModal } from '@/redux/slices/loginModalSlice';
import { useGetCurrentUserQuery } from '@/redux/services/api';

export default function SidebarTweetButton() {
  const router = useRouter();
  const dispatch = useDispatch();
  const currentUser = useGetCurrentUserQuery();

  const onClick = useCallback(() => {
    !currentUser && dispatch(openLoginModal());
    router.push('/');
  }, [dispatch, router, currentUser]);

  return (
    <div onClick={onClick}>
      <div className='mt-6 rounded-full h-14 w-14 p-4 flex items-center justify-center bg-sky-500 lg:hidden hover:bg-opacity-80 transition cursor-pointer'>
        <FaFeather size={24} color='white' />
      </div>
      <div className='mt-6 hidden lg:block px-4 py-2 rounded-full bg-sky-500 hover:bg-opacity-90 cursor-pointer transition'>
        <p className='hidden lg:block text-center font-semibold text-white text-[20px]' onClick={onClick}>
          Tweet
        </p>
      </div>
    </div>
  );
}
