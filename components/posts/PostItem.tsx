import { useRouter } from 'next/navigation';
import { useCallback, useMemo } from 'react';
import { AiFillHeart, AiOutlineHeart, AiOutlineMessage } from 'react-icons/ai';
import { formatDistanceToNowStrict } from 'date-fns';
import { openLoginModal } from '@/redux/slices/loginModalSlice';
import { useGetCurrentUserQuery } from '@/redux/services/api';
import useLike from '@/hooks/useLike';
import Avatar from '../Avatar';
import { useDispatch } from 'react-redux';

type Props = {
  data: Record<string, any>;
  userId?: string;
};

export default function PostItem({ data = {}, userId }: Props) {
  const router = useRouter();
  const dispatch = useDispatch();

  const { data: currentUser } = useGetCurrentUserQuery();
  const { hasLiked, toggleLike } = useLike({ postId: data.id, userId });

  const goToUser = useCallback(
    (e: any) => {
      e.stopPropagation();
      router.push(`/users/${data.user.id}`);
    },
    [router, data.user.id]
  );

  const goToPost = useCallback(() => {
    router.push(`/posts/${data.id}`);
  }, [router, data.id]);

  const onLike = useCallback(
    async (e: any) => {
      e.stopPropagation();
      if (!currentUser) dispatch(openLoginModal());
      toggleLike();
    },
    [dispatch, currentUser, toggleLike]
  );
  const LikeIcon = hasLiked ? AiFillHeart : AiOutlineHeart;

  const createdAt = useMemo(() => {
    if (!data?.createdAt) return null;

    return formatDistanceToNowStrict(new Date(data.createdAt));
  }, [data.createdAt]);

  return (
    <div
      onClick={goToPost}
      className='border-b-[1px] border-neutral-800 p-5 cursor-pointer hover:bg-neutral-900 transition'
    >
      <div className='flex flex-row items-start gap-3'>
        <Avatar userId={data.user.id} />
        <div>
          <div className='flex flex-row items-center gap-2'>
            <p onClick={goToUser} className='text-white font-semibold cursor-pointer hover:underline'>
              {data.user.name}
            </p>
            <span onClick={goToUser} className='text-neutral-500 cursor-pointer hover:underline hidden md:block'>
              @{data.user.username}
            </span>
            <span className='text-neutral-500 text-sm'>{createdAt}</span>
          </div>
          <div className='text-white mt-1'>{data.body}</div>
          <div className='flex flex-row items-center mt-3 gap-10'>
            <div className='flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-sky-500'>
              <AiOutlineMessage size={20} />
              <p>{data.comments?.length || 0}</p>
            </div>
            <div
              onClick={onLike}
              className='flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition'
            >
              <LikeIcon color={hasLiked ? 'red' : ''} size={20} className='hover:text-red-500' />
              <p>{data.likedIds.length}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
