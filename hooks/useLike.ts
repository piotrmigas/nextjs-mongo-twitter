import { useCallback, useMemo } from 'react';
import { toast } from 'react-hot-toast';
import { openLoginModal } from '@/redux/slices/loginModalSlice';
import {
  useGetCurrentUserQuery,
  useGetPostQuery,
  useLikePostMutation,
  useUnLikePostMutation,
} from '../redux/services/api';
import { useGetPostsQuery } from '../redux/services/api';
import { useDispatch } from 'react-redux';

const useLike = ({ postId, userId }: { postId: string; userId?: string }) => {
  const { data: currentUser } = useGetCurrentUserQuery();
  const { data: fetchedPost, refetch: refetchPost } = useGetPostQuery(postId);
  const { refetch: refetchPosts } = useGetPostsQuery(userId);
  const [like] = useLikePostMutation();
  const [unLike] = useUnLikePostMutation();

  const dispatch = useDispatch();

  const hasLiked = useMemo(() => {
    const list = fetchedPost?.likedIds || [];
    return list.includes(currentUser?.id as string);
  }, [fetchedPost, currentUser]);

  const toggleLike = useCallback(async () => {
    if (!currentUser) dispatch(openLoginModal());

    try {
      let request;

      if (hasLiked) {
        request = () => unLike({ postId });
      } else {
        request = () => like({ postId });
      }

      await request();
      refetchPost();
      refetchPosts();

      toast.success('Success');
    } catch (error) {
      toast.error('Something went wrong');
    }
  }, [currentUser, hasLiked, postId, refetchPost, refetchPosts, dispatch]);

  return {
    hasLiked,
    toggleLike,
  };
};

export default useLike;
