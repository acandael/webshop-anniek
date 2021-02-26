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
    margin-bottom: 64px;
  }
  
  h1 {
    text-transform: uppercase;

    ${responsive.smAndLess} {
      text-align: center;
      margin-bottom: 32px;
    }
  }

  p {
    font-size: 20px;
  }
`

export const Content = styled.div`
  width: 40vw;
  padding: 0 16px;

  ${responsive.smAndLess} {
    width: 100vw;
    max-width: 100%;
    padding: 0 0;
  }
`

export const ImageWrapper = styled.div`
  position: relative;
  z-index: 1;
  border: 1px solid var(--color-box-background);
  /* overflow: hidden; */
  /* height: 100%; */

  ${responsive.smAndLess} {
    margin-bottom: 64px;
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

export const Logo = styled(Image)`
  

  > img {
    object-fit: contain;
    object-position: center;
    width: 70%;
    height: 100%;
    margin-bottom: 36px;
    /* overflow: hidden; */
    /* border-radius: 12px; */
  }
`;

export const Item = styled.div`
  &.item-product {
    grid-column-end: span 1;
  }
  &.item-document {
    grid-column-end: span 2;
  }
`;

export const StyledLink = styled.a`
  cursor: pointer;
  font-size: 20px;
  color: #DCA090;
`;
