import styled from 'styled-components';

interface Props {
  isHeader?: boolean;
}

export const Container = styled.main`
  width: 100%;
  height: 100vh;
  padding: 1.5rem 4.5rem;
`;

export const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const HeaderInfo = styled.div`
  display: flex;
  align-items: center;
  gap: .75rem;

  img {
    border-radius: 8px;
  }

  span {
    font-weight: 700;
    cursor: pointer;
  }

  svg {
    cursor: pointer;
  }
`;

export const ContentContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items:  center;
  margin-top: 1rem;

  & > h2 {
  font-weight: 400;
  font-size: 36px;
  line-height: 49px;
  letter-spacing: -0.035em;
  }

  & > span {
    font-weight: 300;
    font-size: 18px;
    line-height: 25px;
    letter-spacing: -0.035em;
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 850px;

  border: 1px solid #E0E0E0;
  border-radius: 12px;

  margin-top: 40px;
`;

export const ContentSection = styled.div<Props>`
  width: 100%;
  display: flex;
  justify-content: ${props => props.isHeader ? 'space-between' : ''};
  align-items: center;

  padding: 2rem 3rem;
  border-bottom: 1px solid #d3d3d3;

  & > p {
    font-weight: 500;
    font-size: 18px;
    line-height: 25px;
    letter-spacing: -0.035em;
    color: #333333;
  }

  & > img {
    border-radius: 12px;
  }

  &:last-of-type {
    border-bottom: none;
  }

  & > div {
    h2 {
      font-weight: 400;
      font-size: 24px;
      line-height: 33px;
      letter-spacing: -0.035em;
    }

    p {
      font-weight: 500;
      font-size: 13px;
      line-height: 18px;
      letter-spacing: -0.035em;
      color: #828282;
    }
  }
`;

export const Title = styled.span`
  font-weight: 500;
  font-size: 13px;
  line-height: 18px;
  width: 100%;
  max-width: 280px;

  letter-spacing: -0.035em;

  color: #BDBDBD;
`;
