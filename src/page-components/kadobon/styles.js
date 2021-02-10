import styled from 'styled-components';
import { responsive, Outer as outer } from 'ui';
import {Header, H3 as h3} from 'ui';

export const KadoHeader = styled(Header)`
  max-width: 1440px;
  padding: 0;
  margin-top: 98px;
  margin-bottom: 32px;
  h1 {
    text-align: left;
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

export const HeroImage = styled.div`
  
`

export const H3 = styled(h3)`
    margin-top: 0;
    margin-bottom: 16px;
`

export const Fields = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 50px;
  
  label {
    font-size: 16px;
    color: var(--color-text-sub);
  }

  input {
    border: 2px solid var(--color-box-background);
    padding: 15px;
    margin-top: 8px;
    margin-bottom: 32px;

    &:focus {
      outline: none;
      border: 2px solid var(--color-primary);
    }
  }

  textarea {
    border: 2px solid var(--color-box-background);
    padding: 15px;
    margin-top: 8px;
    margin-bottom: 32px;

    &:focus {
      outline: none;
      border: 1px solid var(--color-primary);
    }
  }

  button {
    
  }

  ${responsive.smAndLess} {
    display: block;

    input {
      width: 100%;
      min-width: auto;
      border-right-width: 2px;
      margin-bottom: 20px;
    }
  }
`;
