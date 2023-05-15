import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useUpdateUserMutation } from '@/redux/services/api';
import Input from '../Input';
import Modal from './Modal';
import { useGetCurrentUserQuery } from '@/redux/services/api';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsOpen } from '@/redux/slices/editModalSlice';
import { closeEditModal } from '@/redux/slices/editModalSlice';
import ImageUpload from '../ImageUpload';

export default function EditModal() {
  const { data: currentUser } = useGetCurrentUserQuery();
  const [upadateUser] = useUpdateUserMutation();
  const isOpen = useSelector(selectIsOpen);

  const [profileImage, setProfileImage] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    setProfileImage(currentUser?.profileImage as string);
    setCoverImage(currentUser?.coverImage as string);
    setName(currentUser?.name as string);
    setUsername(currentUser?.username as string);
    setBio(currentUser?.bio as string);
  }, [currentUser?.name, currentUser?.username, currentUser?.bio, currentUser?.profileImage, currentUser?.coverImage]);

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);

      await upadateUser({ userId: currentUser?.id, name, username, bio, profileImage, coverImage });

      toast.success('Updated');

      dispatch(closeEditModal());
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  }, [dispatch, name, username, bio, upadateUser, profileImage, coverImage, currentUser?.id]);

  const body = (
    <div className='flex flex-col gap-4'>
      <ImageUpload
        value={profileImage}
        disabled={isLoading}
        onChange={(image: string) => setProfileImage(image)}
        label='Upload profile image'
      />
      <ImageUpload
        value={coverImage}
        disabled={isLoading}
        onChange={(image: string) => setCoverImage(image)}
        label='Upload cover image'
      />
      <Input placeholder='Name' onChange={(e) => setName(e.target.value)} value={name} disabled={isLoading} />
      <Input
        placeholder='Username'
        onChange={(e) => setUsername(e.target.value)}
        value={username}
        disabled={isLoading}
      />
      <Input placeholder='Bio' onChange={(e) => setBio(e.target.value)} value={bio} disabled={isLoading} />
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={isOpen}
      title='Edit your profile'
      actionLabel='Save'
      onClose={() => dispatch(closeEditModal())}
      onSubmit={onSubmit}
      body={body}
    />
  );
}
