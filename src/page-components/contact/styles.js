import styled from 'styled-components';
import { responsive, Outer as outer } from 'ui';
import {Header, H3 as h3} from 'ui';

export const Outer = styled(outer)`
  margin-bottom: 0;
  padding-bottom: 0;
`

export const ContactHeader = styled(Header)`
  max-width: 1440px;
  padding: 0;
  margin-top: 98px;
  margin-bottom: 32px;
  h1 {
    text-align: left;

    ${responsive.smAndLess} {
      text-align: center;
    }
  }
`

export const HeroSection = styled.div`
  display: flex;
  justify-content: space-between;
`
export const HeroText = styled.div`
  display: flex;
  flex-direction: column;
  width: 40%;

  ${responsive.smAndLess} {
    width: 100%;
  }

  p {
    font-size: 16px;
    margin-bottom: 36px;
  }

  ul li {
    font-size: 16px;
  }

  a {
    text-decoration: none;
    border-bottom: none;
    font-weight: 400;
    margin-left: 8px;
    }
`;

export const H3 = styled(h3)`
    margin-top: 0;
    margin-bottom: 16px;
`

export const GoogleMap = styled.div`
  margin-top: 166px;
  
  margin-bottom: 0;
`
