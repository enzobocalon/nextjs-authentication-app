import * as S  from './styles';

interface Props {
  children: React.ReactNode
  isEdit: boolean;
  onClick?: () => void;
}

const Button = ({children, isEdit, onClick}: Props) => {
  return (
    <S.Button isEdit={isEdit} type={isEdit ? 'button' : 'submit'} onClick={onClick}>
      {children}
    </S.Button>
  );
};

export default Button;
