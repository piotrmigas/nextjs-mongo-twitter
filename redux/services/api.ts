import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Notification, Post, User } from '@prisma/client';

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api' }),
  tagTypes: ['Posts', 'Users', 'Notifications'],
  endpoints: (builder) => ({
    getCurrentUser: builder.query<User, void>({
      query: () => '/current',
      providesTags: () => [{ type: 'Users' }],
    }),
    getUser: builder.query<User & { followersCount: number }, string>({
      query: (userId) => `/users/${userId}`,
      providesTags: (userId) => [{ type: 'Users', userId }],
    }),
    getUsers: builder.query<User[], void>({
      query: () => '/users',
      providesTags: () => [{ type: 'Users', id: 'List' }],
    }),
    registerUser: builder.mutation<User, any>({
      query: (body) => ({
        url: 'register',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Users'],
    }),
    updateUser: builder.mutation<User, any>({
      query: ({ name, username, bio, profileImage, coverImage }) => ({
        url: '/edit',
        method: 'PATCH',
        body: { name, username, bio, profileImage, coverImage },
      }),
      invalidatesTags: ['Users'],
      //optimistic update
      async onQueryStarted({ userId, ...patch }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          api.util.updateQueryData('getUser', userId, (draft) => {
            Object.assign(draft, patch);
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
    getPost: builder.query<Post & { comments: Comment[] }, string>({
      query: (postId) => `/posts/${postId}`,
      providesTags: (postId) => [{ type: 'Posts', postId }],
    }),
    getPosts: builder.query<Post[] & { comments: Comment[] }, string | void>({
      query: (userId) => (userId ? `/posts?userId=${userId}` : '/posts'),
      providesTags: (result) => (result ? result.map(({ id }) => ({ type: 'Posts', id })) : ['Posts']),
    }),
    createPost: builder.mutation<Post, Partial<Post>>({
      query: (body) => ({
        url: 'posts',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Posts'],
    }),
    createComment: builder.mutation<Comment, { postId: string; body: string }>({
      query: ({ postId, body }) => ({
        url: `/comments?postId=${postId}`,
        method: 'POST',
        body: { body },
      }),
    }),
    followUser: builder.mutation({
      query: (userId) => ({
        url: '/follow',
        method: 'POST',
        body: userId,
      }),
    }),
    unFollowUser: builder.mutation<string, { userId: string }>({
      query: (userId) => ({
        url: '/follow',
        method: 'DELETE',
        params: userId,
      }),
    }),
    likePost: builder.mutation({
      query: (postId) => ({
        url: '/like',
        method: 'POST',
        body: postId,
      }),
    }),
    unLikePost: builder.mutation<string, { postId: string }>({
      query: (postId) => ({
        url: '/like',
        method: 'DELETE',
        params: postId,
      }),
    }),
    getNotifications: builder.query<Notification[], string>({
      query: (userId) => `/notifications/${userId}`,
      providesTags: (result) => (result ? result.map(({ id }) => ({ type: 'Notifications', id })) : ['Notifications']),
    }),
  }),
});

export const {
  useGetCurrentUserQuery,
  useGetUserQuery,
  useGetUsersQuery,
  useUpdateUserMutation,
  useGetPostQuery,
  useGetPostsQuery,
  useCreatePostMutation,
  useFollowUserMutation,
  useUnFollowUserMutation,
  useLikePostMutation,
  useUnLikePostMutation,
  useRegisterUserMutation,
  useCreateCommentMutation,
  useGetNotificationsQuery,
} = api;
