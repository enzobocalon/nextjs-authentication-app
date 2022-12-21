import Image from 'next/image';
import { signOut } from 'next-auth/react';

import { MdOutlineArrowBackIosNew, MdPhotoCamera } from 'react-icons/md';

import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

import pfpPlaceholder from '../../assets/Profile_avatar_placeholder_large.png';
import Button from '../Button';

import * as S from './styles';
import axios from 'axios';
import { User } from '../../types/User';
import { Dispatch, SetStateAction } from 'react';
import { useRouter } from 'next/dist/client/router';

interface Form {
  name: string,
  bio: string,
  phone: string,
  password: string,
  avatar_url: FileList
}

interface Props {
  session: User;
  setIsEditing: Dispatch<SetStateAction<boolean>>
}

const ProfileChanger = ({ session, setIsEditing }: Props) => {
  const { register, handleSubmit } = useForm();
  const router = useRouter();

  const onSubmit: SubmitHandler<FieldValues> = async ({name, avatar_url, bio, password, phone}) => {
    if (!session.id) {
      return;
    }

    const formData = new FormData();
    formData.append('image', avatar_url[0]);
    formData.append('user', JSON.stringify({
      name: name ? name : null,
      bio: bio ? bio : null,
      password: password ? password : null,
      phone: phone ? phone : null,
      id: session.id,
      avatar_url: avatar_url[0] ? avatar_url[0] : null
    }));
    await axios.post('/api/auth/update', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    }).then(() => {
      signOut();
      router.push('/');
    });
  };
  return (
    <S.Container>
      <S.BackContainer onClick={() => setIsEditing(false)}>
        <MdOutlineArrowBackIosNew color='#2D9CDB'/>
        <span>Back</span>
      </S.BackContainer>

      <S.Content>
        <h2>Change Info</h2>
        <p>Changes will be reflected to every services</p>

        <S.InfoContainer>
          <Image
            src={session?.avatar_url !== 'undefined' ? `/uploads/profiles/${session.avatar_url}` : pfpPlaceholder}
            width={72}
            height={72}
            alt='profile image'/>
          <S.ImageOverlay>
            <input
              type={'file'}
              {...register('avatar_url')} />
            <MdPhotoCamera color='#FFFFFF' size={20}/>
          </S.ImageOverlay>
          <span>CHANGE PHOTO</span>
        </S.InfoContainer>

        <S.Form onSubmit={handleSubmit(onSubmit)}>
          <S.FormContent>
            <span>Name</span>
            <S.Input
              placeholder='Enter your name...'
              {...register('name')}
            />
          </S.FormContent>

          <S.FormContent>
            <span>Bio</span>
            <S.TextArea
              placeholder='Enter your bio...'
              {...register('bio')}/>
          </S.FormContent>

          <S.FormContent>
            <span>Phone</span>
            <S.Input
              placeholder='Enter your phone...'
              {...register('phone')}/>
          </S.FormContent>

          <S.FormContent>
            <span>Email</span>
            <S.FixedInput>{session.email}</S.FixedInput>
          </S.FormContent>

          <S.FormContent>
            <span>Password</span>
            <S.Input
              placeholder='Enter your password...'
              {...register('password')}/>
          </S.FormContent>

          <Button isEdit={false} maxWidth={85}>Save</Button>
        </S.Form>
      </S.Content>
    </S.Container>
  );
};

export default ProfileChanger;
