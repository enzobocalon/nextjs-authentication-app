import * as S  from './styles';

interface Props {
  children: React.ReactNode
  isEdit: boolean;
  onClick?: () => void;
  maxWidth?: number,
}

const Button = ({children, isEdit, onClick, maxWidth}: Props) => {
  return (
    <S.Button isEdit={isEdit} type={isEdit ? 'button' : 'submit'} onClick={onClick} style={{maxWidth: maxWidth ? maxWidth : ''}}>
      {children}
    </S.Button>
  );
};

export default Button;
