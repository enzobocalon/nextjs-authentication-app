import styled from 'styled-components';

export const Header = styled.div``;

export const MediaContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 21px;

  span {
    font-weight: 400;
    color: #828282;
    letter-spacing: -0.035em;
    line-height: 19px;
  }
`;

export const Media = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 21px;
`;

export const Icon = styled.div``;

export const Text = styled.p`
  text-align: center;
  color: #828282;
  letter-spacing: -0.035em;
  font-weight: 400;
  font-size: 14px;
  line-height: 19px;

  a {
    color: #2D9CDB;
    text-decoration: none;
  }
`;
