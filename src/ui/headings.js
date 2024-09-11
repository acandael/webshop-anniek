import styled from 'styled-components';

import { responsive } from './responsive';

export const H1 = styled.h1`
  margin: 0 0 15px;
  font-size: 3rem;
  font-weight: 500;
  color: var(--color-text-main);

  ${responsive.smAndLess} {
    font-size: 2.5rem;
  }

  ${responsive.xs} {
    font-size: 2rem;
    line-height: 100%;
  }
`;

export const H2 = styled.h2`
  color: var(--color-text-main);
  font-size: 2rem;
  margin: 1rem 0;

  ${responsive.smAndLess} {
    font-size: 1.5rem;
  }
`;

export const H3 = styled.h3`
  color: var(--color-text-main);
  font-size: 1.4rem;
  margin: 1rem 0;

  ${responsive.smAndLess} {
    font-size: 1.2rem;
  }
`;

export const H4 = styled.h4`
  color: var(--color-text-main);
  font-size: 1.2rem;
  font-weight: 500;
  margin: 1rem 0;

  ${responsive.smAndLess} {
    font-size: 1.1rem;
  }
`;
