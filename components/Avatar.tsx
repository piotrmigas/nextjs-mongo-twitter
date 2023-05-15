import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { useGetUserQuery } from '../redux/services/api';

type Props = {
  userId: string;
  isLarge?: boolean;
  hasBorder?: boolean;
};

export default function Avatar({ userId, isLarge, hasBorder }: Props) {
  const router = useRouter();

  const { data: fetchedUser } = useGetUserQuery(userId);

  const onClick = useCallback(
    (e: any) => {
      e.stopPropagation();
      const url = `/users/${userId}`;
      router.push(url);
    },
    [router, userId]
  );

  return (
    <div
      className={`${hasBorder ? 'border-4 border-black' : ''} ${
        isLarge ? 'h-32 w-32' : 'h-12 w-12'
      } rounded-full hover:opacity-90 transition cursor-pointer relative`}
    >
      <Image
        fill
        style={{
          objectFit: 'cover',
          borderRadius: '100%',
        }}
        alt='Avatar'
        onClick={onClick}
        src={fetchedUser?.profileImage || '/images/placeholder.png'}
      />
    </div>
  );
}
