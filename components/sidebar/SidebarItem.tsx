import { IconType } from 'react-icons';
import { useRouter } from 'next/navigation';
import { BsDot } from 'react-icons/bs';
import { useCallback } from 'react';
import { useGetCurrentUserQuery } from '@/redux/services/api';
import { useDispatch } from 'react-redux';
import { openLoginModal } from '@/redux/slices/loginModalSlice';

type Props = {
  href?: string;
  icon: IconType;
  label: string;
  onClick?: () => void;
  auth?: boolean;
  alert?: boolean | null;
};

export default function SidebarItem({ href, label, icon: Icon, onClick, auth, alert }: Props) {
  const router = useRouter();
  const { data: currentUser } = useGetCurrentUserQuery();
  const dispatch = useDispatch();

  const handleClick = useCallback(() => {
    if (onClick) return onClick();
    if (auth && !currentUser) {
      dispatch(openLoginModal());
    } else if (href) {
      router.push(href);
    }
  }, [router, onClick, href, auth, currentUser, dispatch]);

  return (
    <div onClick={handleClick} className='flex items-center'>
      <div className='relative rounded-full h-14 w-14 flex items-center justify-center p-4 hover:bg-slate-300 hover:bg-opacity-10 cursor-pointer lg:hidden'>
        <Icon size={28} color='white' />
        {alert && <BsDot className='text-sky-500 absolute -top-4 left-0' size={70} />}
      </div>
      <div className='relative hidden lg:flex items-center gap-4 p-4 rounded-full hover:bg-slate-300 hover:bg-opacity-10 cursor-pointer'>
        <Icon size={24} color='white' />
        <p className='hidden lg:block text-white text-xl'>{label}</p>
        {alert && <BsDot className='text-sky-500 absolute -top-4 left-0' size={70} />}
      </div>
    </div>
  );
}
