import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 24px;
  width: 100%;
  max-width: 850px;
  margin-top: 1rem;
  margin-inline: auto;
`;

export const BackContainer = styled.div `
  display: flex;
  align-items: center;
  gap: 14px;
  cursor: pointer;

  & > span {
    color: #2D9CDB;
  }
`;

export const Content = styled.div`
  width: 100%;
  border: 1px solid #E0E0E0;
  border-radius: 12px;
  padding: 2rem;

  & > h2 {
    font-weight: 400;
    font-size: 24px;
    line-height: 33px;
    letter-spacing: -0.035em;
  }

  & > p {
    font-weight: 500;
    font-size: 13px;
    line-height: 18px;
    letter-spacing: -0.035em;

    color: #828282;
  }
`;

export const InfoContainer = styled.div`
  margin-top: 1.5rem;
  display: flex;
  align-items: center;
  gap: 27.5px;
  max-width: 200px;

  & > img {
    border-radius: 8px;
    position: relative;
  }

  & > span {
    font-weight: 500;
    font-size: 13px;
    line-height: 18px;

    letter-spacing: -0.035em;

    color: #828282;
  }

  &:hover > div {
    opacity: 1;
    pointer-events: all;
    transition: all .3s ease;
  }
`;

export const ImageOverlay = styled.div`
  opacity: 0;
  pointer-events: none;
  position: absolute;
  width: 72px;
  height: 72px;
  background-color: rgba(0, 0, 0, .3);
  border-radius: 8px;
  cursor: pointer;
  transition: all .3s ease;

  display: flex;
  align-items: center;
  justify-content: center;

  & > input {
    height: 100%;
    position: absolute;
    cursor: pointer;
    opacity: 0;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-top: 24px;
`;

export const FormContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 420px;
`;

export const FixedInput = styled.div`
  padding: .85rem 1rem;
  border: 1px solid #828282;
  border-radius: 12px;
  background-color: transparent;
`;

export const Input = styled.input`
  padding: .85rem 1rem;
  border: 1px solid #828282;
  background-color: transparent;
  border-radius: 12px;
  outline: none;
  font-family: 'Noto Sans';
  margin-top: 4px;

  &::placeholder {
    font-family: 'Noto Sans';
    font-style: normal;
    font-weight: 500;
    font-size: 13px;
    line-height: 18px;

    letter-spacing: -0.035em;

    color: #BDBDBD;
  }
`;

export const TextArea = styled.textarea`
  padding: .85rem 1rem;
  border: 1px solid #828282;
  border-radius: 12px;
  background-color: transparent;
  outline: none;
  resize: none;
  margin-top: 4px;

  font-family: 'Noto Sans';

&::placeholder {
  font-family: 'Noto Sans';
  font-style: normal;
  font-weight: 500;
  font-size: 13px;
  line-height: 18px;

  letter-spacing: -0.035em;

  color: #BDBDBD;
}
`;
