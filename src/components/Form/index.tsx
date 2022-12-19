import * as S from './styles';
import { MdEmail, MdLock } from 'react-icons/md';
import Button from '../Button';

const Form = () => {
  return (
    <S.Form>
      <S.InputContainer>
        <MdEmail size={24}/>
        <S.Input placeholder='Email'/>
      </S.InputContainer>

      <S.InputContainer>
        <MdLock size={24}/>
        <S.Input placeholder='Password'/>
      </S.InputContainer>

      <Button>Login</Button>
    </S.Form>
  );
};

export default Form;
