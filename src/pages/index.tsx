import Head from 'next/head';
import LoginCard from '../components/LoginCard';
import * as S from '../styles/index';

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <S.Container>
        <S.Wrapper>
          <LoginCard />
        </S.Wrapper>
      </S.Container>
    </>
  );
}
