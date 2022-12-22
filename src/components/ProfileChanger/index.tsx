import axios from 'axios';
import Image from 'next/image';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { toast } from 'react-toastify';
import { Dispatch, SetStateAction } from 'react';

import * as S from './styles';
import { MdOutlineArrowBackIosNew, MdPhotoCamera } from 'react-icons/md';

import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import pfpPlaceholder from '../../assets/Profile_avatar_placeholder_large.png';

import Button from '../Button';

interface Props {
  setIsEditing: Dispatch<SetStateAction<boolean>>
}

const ProfileChanger = ({ setIsEditing }: Props) => {
  const {data: session} = useSession();
  const { register, handleSubmit } = useForm();
  const router = useRouter();

  const onSubmit: SubmitHandler<FieldValues> = async ({name, bio, password, phone}) => {

    const dataObject = {
      id: session?.id,
      name,
      bio,
      password,
      phone,
      email: session?.user?.email
    };

    await axios.post('/api/auth/update', dataObject, {
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(() => {
      toast.success('User informations changed!');
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
            src={session?.user && session.user.image ? session.user.image : pfpPlaceholder}
            width={72}
            height={72}
            alt='profile image'/>
          <S.ImageOverlay>
            <input
              type={'file'} disabled/>
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
            <S.FixedInput>{session?.user ? session.user.email : 'None'}</S.FixedInput>
          </S.FormContent>

          <S.FormContent>
            <span>Password</span>
            <S.Input
              placeholder='Enter your password...'
              {...register('password')}
              type='password'/>
          </S.FormContent>

          <Button isEdit={false} maxWidth={85}>Save</Button>
        </S.Form>
      </S.Content>
    </S.Container>
  );
};

export default ProfileChanger;
