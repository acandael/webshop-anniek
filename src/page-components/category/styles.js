import styled from 'styled-components';

import { responsive, Outer as outer, H1 as h1 } from 'ui';

export const H1 = styled(h1)`
  margin-top: 64px;
`;

export const Outer = styled(outer)`
  margin-top: 64px;
`;

export const List = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-gap: 1.5rem;

  a {
    padding-left: 0;
  }

  h3 {
    padding-left: 0;
  }

  ${responsive.xs} {
    display: block;
  }
  ${responsive.sm} {
    grid-template-columns: repeat(12, 1fr);
  }

  ${responsive.md} {
    grid-template-columns: repeat(12, 1fr);
  }

  ${responsive.lg} {
    grid-template-columns: repeat(12, 1fr);
  }
`;
