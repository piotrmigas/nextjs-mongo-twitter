import { useCallback, useState } from 'react';
import { toast } from 'react-hot-toast';
import { openLoginModal } from '@/redux/slices/loginModalSlice';
import { openRegisterModal } from '@/redux/slices/registerModalslice';
import Avatar from './Avatar';
import Button from './Button';
import {
  useGetCurrentUserQuery,
  useGetPostQuery,
  useGetPostsQuery,
  useCreatePostMutation,
  useCreateCommentMutation,
} from '@/redux/services/api';
import { useDispatch } from 'react-redux';

type Props = {
  placeholder: string;
  isComment?: boolean;
  postId?: string;
};

export default function Form({ placeholder, isComment, postId }: Props) {
  const dispatch = useDispatch();
  const [createPost] = useCreatePostMutation();
  const [createComment] = useCreateCommentMutation();

  const { data: currentUser } = useGetCurrentUserQuery();
  const { refetch: refetchPosts } = useGetPostsQuery();
  const { refetch: refetchPost } = useGetPostQuery(postId as string);

  const [body, setBody] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);

      isComment && postId ? await createComment({ postId, body }) : await createPost({ body });

      toast.success(isComment ? 'Comment sent' : 'Tweet created');
      setBody('');
      refetchPosts();
      refetchPost();
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  }, [body, refetchPost, isComment, postId, refetchPosts, createComment, createPost]);

  return (
    <div className='border-b-[1px] border-neutral-800 px-5 py-2'>
      {currentUser ? (
        <div className='flex gap-4'>
          <div>
            <Avatar userId={currentUser?.id} />
          </div>
          <div className='w-full'>
            <textarea
              disabled={isLoading}
              onChange={(e) => setBody(e.target.value)}
              value={body}
              className='disabled:opacity-80 peer resize-none mt-3 w-full bg-black ring-0 outline-none text-[20px] placeholder-neutral-500 text-white'
              placeholder={placeholder}
            />
            <hr className='opacity-0 peer-focus:opacity-100 h-[1px] w-full  border-neutral-800 transition' />
            <div className='mt-4 flex justify-end'>
              <Button disabled={isLoading || !body} onClick={onSubmit} label='Tweet' />
            </div>
          </div>
        </div>
      ) : (
        <div className='py-8'>
          <h1 className='text-white text-2xl text-center mb-4 font-bold'>Welcome to Twitter</h1>
          <div className='flex items-center justify-center gap-4'>
            <Button label='Login' onClick={() => dispatch(openLoginModal())} />
            <Button label='Register' onClick={() => dispatch(openRegisterModal())} secondary />
          </div>
        </div>
      )}
    </div>
  );
}
