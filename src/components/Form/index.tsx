import * as S from './styles';
import { MdEmail, MdLock } from 'react-icons/md';
import Button from '../Button';

interface Props {
  register: boolean;
}

const Form = ({register}: Props) => {
  return (
    <S.Form>
      <S.InputContainer>
        <MdEmail size={24} color={'#828282'}/>
        <S.Input placeholder='Email'/>
      </S.InputContainer>

      <S.InputContainer>
        <MdLock size={24} color={'#828282'}/>
        <S.Input placeholder='Password'/>
      </S.InputContainer>

      {
        !register ? (
          <Button>Login</Button>
        ) : (
          <Button>Start coding now</Button>
        )
      }
    </S.Form>
  );
};

export default Form;
