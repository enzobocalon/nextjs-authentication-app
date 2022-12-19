import styled from 'styled-components';

interface Props {
  isEdit: boolean;
}

export const Button = styled.button<Props>`
  width: 100%;
  max-width: ${props => props.isEdit ? '7rem' : ''};

  background: ${props => props.isEdit ? 'transparent' : '#2F80ED'};
  color: ${props => props.isEdit ? '#828282' : 'white'};
  font-weight: ${props => props.isEdit ? '500' : '600'};
  font-size: 16px;
  border-radius: ${props => props.isEdit ? '12px' : '8px'};
  border: ${props => props.isEdit ? '1px solid #828282' : 'none'};
  outline: none;
  padding-block: .5rem;
  cursor: pointer;
`;
