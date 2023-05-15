import { useGetUserQuery } from '@/redux/services/api';
import Image from 'next/image';
import Avatar from './Avatar';

type Props = {
  userId: string;
};

export default function UserHero({ userId }: Props) {
  const { data: fetchedUser } = useGetUserQuery(userId);

  return (
    <div>
      <div className='bg-neutral-700 h-44 relative'>
        {fetchedUser?.coverImage && (
          <Image src={fetchedUser.coverImage} fill alt='Cover Image' style={{ objectFit: 'cover' }} />
        )}
        <div className='absolute -bottom-16 left-4'>
          <Avatar userId={userId} isLarge hasBorder />
        </div>
      </div>
    </div>
  );
}
