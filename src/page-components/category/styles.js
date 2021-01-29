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
  
  h1 {
    margin-bottom: 72px;
    text-transform: uppercase;
  }
`

export const Content = styled.div`
  width: 40vw;
  border-bottom: 1px solid #E0E0E0;

  h1 {
    margin-bottom: 24px;
  }

  p {
    margin-top: 24px;
  }
`

export const ImageWrapper = styled.div`
  position: relative;
  z-index: 1;
  /* overflow: hidden; */
  /* height: 100%; */
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
