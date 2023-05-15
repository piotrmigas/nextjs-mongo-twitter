import { useRouter } from 'next/router';
import { Watch } from 'react-loader-spinner';
import { useGetPostQuery } from '@/redux/services/api';
import Header from '@/components/Header';
import Form from '@/components/Form';
import PostItem from '@/components/posts/PostItem';
import CommentFeed from '@/components/posts/CommentFeed';

export default function PostView() {
  const router = useRouter();
  const { postId } = router.query;

  const { data: fetchedPost, isLoading } = useGetPostQuery(postId as string);

  if (isLoading || !fetchedPost) {
    return (
      <div className='flex justify-center items-center h-full'>
        <Watch color='lightblue' width='25' />
      </div>
    );
  }

  return (
    <>
      <Header showBackArrow label='Tweet' />
      <PostItem data={fetchedPost} />
      <Form postId={postId as string} isComment placeholder='Tweet your reply' />
      <CommentFeed comments={fetchedPost?.comments} />
    </>
  );
}
