import styled from 'styled-components';

interface Props {
  isHeader?: boolean;
  isActive?: boolean;
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
  position: relative;

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

export const OptionContainer = styled.div`
  position: absolute;
  bottom: -158px;
  right: 0;

  display: flex;
  flex-direction: column;
  gap: 6px;

  width: 100%;
  max-width: 188px;
  padding: .75rem;

  background: #FFFFFF;
  border: 1px solid #E0E0E0;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.05);
  border-radius: 12px;

  hr {
    border: 1px solid #E0E0E0;
    margin-top: 6px;
  }
`;

export const Option = styled.div<Props>`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  background: ${props => props.isActive ? '#F2F2F2' : 'transparent'};
  border-radius: 8px;

  cursor: pointer;
  transition: all .3s ease;

  & > span {
    font-weight: 500;
    font-size: 12px;
    line-height: 16px;
    letter-spacing: -0.035em;

    color: #4F4F4F;
  }

  &:hover {
    transition: all .3s ease;
    background-color: #F2F2F2;
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
