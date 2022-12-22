import Image from 'next/image';
import Head from 'next/head';
import { useState } from 'react';
import { GetServerSideProps } from 'next/types';
import { getSession, signOut, useSession } from 'next-auth/react';

import { MdKeyboardArrowDown, MdOutlineGroup, MdAccountCircle, MdLogout } from 'react-icons/md';

import logo from '../assets/devchallenges.svg';

import * as S from '../styles/dashboard';
import pfpPlaceholder from '../assets/Profile_avatar_placeholder_large.png';
import Button from '../components/Button';

import ProfileChanger from '../components/ProfileChanger';
import { connectToDatabase } from '../lib/db';

interface Props {
  profile: {
    bio: string,
    phone: string
  }
}

const Dashboard = ({profile}: Props) => {
  const {data: session} = useSession();
  const [options, setOptions] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  return (
    <S.Container>
      <Head>
        <title>Authentication App - Dashboard</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <S.HeaderContainer>
        <Image src={logo} width={120} height={18} alt='logo' />

        <S.HeaderInfo onClick={() => setOptions(prev => !prev)} isOpen={options}>
          <Image
            src={session?.user && session.user.image ? session.user.image : pfpPlaceholder}
            width={32}
            height={32}
            alt='profile image'/>
          <span>{session?.user && session?.name !== 'undefined' ? session?.user?.name : session?.user?.email}</span>
          <MdKeyboardArrowDown />
          {
            options && (

              <S.OptionContainer>
                <S.Option isActive={true}>
                  <MdAccountCircle size={20} color={'#4F4F4F'}/>
                  <span>My Profile</span>
                </S.Option>

                <S.Option isActive={false}>
                  <MdOutlineGroup size={20} color={'#4F4F4F'}/>
                  <span>Group Chat</span>
                </S.Option>

                <hr />

                <S.Option isActive={false} onClick={() => signOut()}>
                  <MdLogout size={20} color={'#EB5757'}/>
                  <span style={{color: '#EB5757'}}>Logout</span>
                </S.Option>
              </S.OptionContainer>
            )
          }
        </S.HeaderInfo>
      </S.HeaderContainer>

      {
        !isEditing ? (
          <S.ContentContainer>
            <h2>Personal Info</h2>
            <span>Basic info, like your name and photo</span>

            <S.Content>
              <S.ContentSection isHeader={true}>
                <div>
                  <h2>Profile</h2>
                  <p>Some info may be visible to other people</p>
                </div>

                <Button isEdit={true} onClick={() => setIsEditing(true)}>Edit</Button>
              </S.ContentSection>

              <S.ContentSection>
                <S.Title>PHOTO</S.Title>
                <Image src={session?.user && session.user.image ? session.user.image : pfpPlaceholder} width={72} height={72} alt='profile image'/>
              </S.ContentSection>
              <S.ContentSection>
                <S.Title>NAME</S.Title>
                <p>{session?.user && session?.name !== 'undefined' ? session?.user?.name : 'None'}</p>
              </S.ContentSection>
              <S.ContentSection>
                <S.Title>BIO</S.Title>
                <p>{session?.user && session?.bio !== 'undefined' ? session?.bio || profile.bio : 'None'}</p>
              </S.ContentSection>
              <S.ContentSection>
                <S.Title>PHONE</S.Title>
                <p>{session?.user && session?.phone !== 'undefined' ? session?.phone || profile.phone : 'None'}</p>
              </S.ContentSection>
              <S.ContentSection>
                <S.Title>EMAIL</S.Title>
                <p>{session?.user ? session.user.email : 'None'}</p>
              </S.ContentSection>
              <S.ContentSection>
                <S.Title>PASSWORD</S.Title>
                <p>************</p>
              </S.ContentSection>
            </S.Content>
          </S.ContentContainer>
        ) : (
          <ProfileChanger setIsEditing={setIsEditing}/>
        )
      }
    </S.Container>
  );
};

export default Dashboard;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session) {
    context.res.writeHead(302, {Location: '/'});
    context.res.end();
    return {
      props: {}
    };
  }

  if (session?.user?.image) {
    const client = await connectToDatabase();
    const db = client.db();

    const user = await db.collection('profile').findOne({
      email: session.email
    });

    console.log(user);

    if (!user) {
      return {
        props: {}
      };
    }

    return {
      props: {
        profile: {
          bio: user.bio,
          phone: user.phone,
          name: user.name
        }
      }
    };
  }

  return {
    props: {}
  };
};
