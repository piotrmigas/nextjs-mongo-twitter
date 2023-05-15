import CommentItem from './CommentItem';

type Props = {
  comments?: Record<string, any>[];
};

export default function CommentFeed({ comments = [] }: Props) {
  return (
    <>
      {comments.map((comment: Record<string, any>) => (
        <CommentItem key={comment.id} data={comment} />
      ))}
    </>
  );
}
