import styled from 'styled-components';

import { responsive } from './responsive';

export const Outer = styled.div`
  padding: 0 1rem;
  margin: 0 auto;
  display: block;
  min-height: 75vh;

  ${responsive.mdPlus} {
    max-width: 1440px;
    padding-left: 100px;
    padding-right: 100px;
  }

  ${responsive.smAndLess} {
    padding-left: 24px;
    padding-right: 24px;
    margin-bottom: 64px;
  }
`;

export const Inner = styled.div`
  margin: 0 auto;
  display: block;
  min-height: 100vh;
  padding: 0 1rem;
  ${responsive.smPlus} {
    padding-left: 2rem;
    padding-right: 2rem;
  }
  ${responsive.mdPlus} {
    max-width: 1800px;
    padding-left: 100px;
    padding-right: 100px;
  }
`;

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 50px;
  padding: 100px 50px 50px;
  max-width: 800px;
  text-align: ${(p) => (p.centerContent ? 'center' : 'left')};
  margin: ${(p) => (p.centerContent ? '0 auto' : '0 0 50px 0')};
  ${responsive.xs} {
    padding: 100px 0 50px;
  }
  h1 {
    font-size: 3rem;
    margin-bottom: 10px;
    /* text-transform: uppercase; */
  }
  p {
    text-align: ${(p) => (p.centerContent ? 'center !important' : 'left')};
    font-size: 16px;
    line-height: 1.6rem;
    color: var(--color-text-sub);
    margin: 0;
  }
`;

export const Message = styled.div`
  border: 3px solid var(--color-primary);
  padding: 1em;
`;
