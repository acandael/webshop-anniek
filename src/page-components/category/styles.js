import styled from 'styled-components';
import { Image } from '@crystallize/react-image';

import { responsive } from 'ui';

export const List = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-gap: 1.5rem;

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

export const BrandHeader = styled.div`
  display: flex;
  width: 100vw;
  margin-top: 111px;
  margin-bottom: 164px;

  ${responsive.smAndLess} {
    display: flex;
    flex-direction: column;
    max-width: 100%;
  }
  
  h1 {
    margin-bottom: 72px;
    text-transform: uppercase;
  }
`

export const Content = styled.div`
  width: 40vw;
  padding: 0 16px;

  ${responsive.smAndLess} {
    max-width: 100%;
    width: 100vw;
  }

  h1 {
    margin-bottom: 24px;

    ${responsive.smAndLess} {
      text-align: center;
    }
  }

  p {
    margin-top: 24px;
  }
`

export const ImageWrapper = styled.div`
  position: relative;
  z-index: 1;
  border: 1px solid var(--color-box-background);
  /* overflow: hidden; */
  /* height: 100%; */
  ${responsive.smAndLess} {
    margin-top: 64px;
  }
`;

export const Img = styled(Image)`
  > img {
    object-fit: contain;
    object-position: center;
    width: 100%;
    height: 100%;
    /* overflow: hidden; */
    /* border-radius: 12px; */
  }
`;
