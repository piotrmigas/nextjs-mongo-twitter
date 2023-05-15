import PostItem from './PostItem';
import { useGetPostsQuery } from '@/redux/services/api';

type Props = {
  userId?: string;
};

export default function PostFeed({ userId }: Props) {
  const { data: posts = [] } = useGetPostsQuery(userId as string);

  return (
    <>
      {posts.map((post: Record<string, any>) => (
        <PostItem userId={userId} key={post.id} data={post} />
      ))}
    </>
  );
}
