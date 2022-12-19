import Image from 'next/image';

import * as S from './styles';
import logo from '../../assets/devchallenges.svg';
import Form from '../Form';

const LoginCard = () => {
  return (
    <>
      <S.Header>
        <Image src={logo} width={120} height={18} alt='logo'/>
      </S.Header>

      <h3>Login</h3>

      <Form />
    </>
  );
};

export default LoginCard;
