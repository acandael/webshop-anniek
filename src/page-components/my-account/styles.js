import styled from 'styled-components';

import { responsive } from 'ui';

export const Outer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  ${responsive.smAndLess} {
    max-width: 100%;
    margin-left: 24px;
    margin-right: 24px;
    margin-bottom: 64px;
  }
`;