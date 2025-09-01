import styled from 'styled-components';
import { Image } from '@crystallize/react-image';
import { Outer as outer, H1 as h1 } from 'ui';
import { responsive } from 'ui';

export const H1 = styled(h1)`
  margin-top: 64px;
  ${responsive.smAndLess} {
    text-align: center;
  }
`;

export const Outer = styled(outer)`
  margin-top: 64px;
`;

export const List = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1.5rem;

  ${responsive.xs} {
    display: block;
  }
  ${responsive.sm} {
    grid-template-columns: repeat(3, 1fr);
  }

  ${responsive.md} {
    grid-template-columns: repeat(3, 1fr);
  }

  ${responsive.lg} {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const ImageWrapper = styled.div`
  position: relative;
  z-index: 1;
  border: 1px solid var(--color-box-background);
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
