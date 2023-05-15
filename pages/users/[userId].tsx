import { useRouter } from 'next/router';
import { Watch } from 'react-loader-spinner';
import PostFeed from '@/components/posts/PostFeed';
import Header from '@/components/Header';
import UserBio from '@/components/UserBio';
import UserHero from '@/components/UserHero';
import { useGetUserQuery } from '@/redux/services/api';

export default function UserView() {
  const router = useRouter();
  const { userId } = router.query;

  const { data: fetchedUser, isLoading } = useGetUserQuery(userId as string);

  if (isLoading || !fetchedUser) {
    return (
      <div className='flex justify-center items-center h-full'>
        <Watch color='lightblue' width='30' />
      </div>
    );
  }

  return (
    <>
      <Header showBackArrow label={fetchedUser?.name as string} />
      <UserHero userId={userId as string} />
      <UserBio userId={userId as string} />
      <PostFeed userId={userId as string} />
    </>
  );
}
