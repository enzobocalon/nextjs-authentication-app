import * as S  from './styles';

interface Props {
  children: React.ReactNode
  isEdit: boolean;
}

const Button = ({children, isEdit}: Props) => {
  return (
    <S.Button isEdit={isEdit}>
      {children}
    </S.Button>
  );
};

export default Button;
