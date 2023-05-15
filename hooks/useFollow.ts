import { useCallback, useMemo } from 'react';
import { toast } from 'react-hot-toast';
import { useGetCurrentUserQuery } from '@/redux/services/api';
import { useFollowUserMutation, useUnFollowUserMutation } from '@/redux/services/api';
import { openLoginModal } from '@/redux/slices/loginModalSlice';
import { useDispatch } from 'react-redux';
import { useGetUserQuery } from '@/redux/services/api';

const useFollow = (userId: string) => {
  const { data: currentUser, refetch: refetchCurrentUser } = useGetCurrentUserQuery();
  const { refetch: refetchUser } = useGetUserQuery(userId);
  const [unFollow] = useUnFollowUserMutation();
  const [follow] = useFollowUserMutation();

  const dispatch = useDispatch();

  const isFollowing = useMemo(() => {
    const list = currentUser?.followingIds || [];
    return list.includes(userId);
  }, [currentUser, userId]);

  const toggleFollow = useCallback(async () => {
    if (!currentUser) dispatch(openLoginModal());

    try {
      let request;

      if (isFollowing) {
        request = () => unFollow({ userId });
      } else {
        request = () => follow({ userId });
      }

      await request();
      refetchCurrentUser();
      refetchUser();

      toast.success('Success');
    } catch (error) {
      toast.error('Something went wrong');
    }
  }, [currentUser, isFollowing, userId, refetchUser, refetchCurrentUser, dispatch]);

  return {
    isFollowing,
    toggleFollow,
  };
};

export default useFollow;
