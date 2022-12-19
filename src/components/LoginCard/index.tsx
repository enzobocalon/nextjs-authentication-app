import Image from 'next/image';

import * as S from './styles';
import logo from '../../assets/devchallenges.svg';
import Form from '../Form';

import google from '../../assets/Google.svg';
import facebook from '../../assets/Facebook.svg';
import twitter from '../../assets/Twitter.svg';
import github from '../../assets/Github.svg';

const LoginCard = () => {
  return (
    <>
      <S.Header>
        <Image src={logo} width={120} height={18} alt='logo'/>
      </S.Header>

      <h3>Login</h3>

      <Form />

      <S.MediaContainer>
        <span>or continue with these social profile</span>

        <S.Media>
          <S.Icon>
            <Image src={google} width={42} height={42} alt='google'/>
          </S.Icon>
          <S.Icon>
            <Image src={facebook} width={42} height={42} alt='facebook'/>
          </S.Icon>
          <S.Icon>
            <Image src={twitter} width={42} height={42} alt='twitter'/>
          </S.Icon>
          <S.Icon>
            <Image src={github} width={42} height={42} alt='github'/>
          </S.Icon>
        </S.Media>
      </S.MediaContainer>

      <S.Text>Don&apos;t have an account yet? <a>Register</a></S.Text> {/* temporary anchor */}
    </>
  );
};

export default LoginCard;
