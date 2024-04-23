import styled from 'styled-components';
import { Image } from '@crystallize/react-image';

import { responsive } from 'ui';

export const Outer = styled.a`
  display: block;
  height: 100%;
  color: var(--color-main-background);
  position: relative;
  padding: 1em;
  background: transparent;
  grid-column-end: span 4;
  ${responsive.xs} {
    margin-bottom: 15px;
  }

  ${responsive.smAndLess} {
    margin-bottom: 64px;
  }
`;

export const ImageWrapper = styled.div`
  position: relative;
  z-index: 1;
  overflow: hidden;
  margin-top: 32px;
  margin-bottom: 32px;
  border: 1px solid var(--color-box-background);
  /* height: 100%; */
`;

export const Img = styled(Image)`
  width: 100%;
  height: 100%;
  overflow: hidden;
  > img {
    display: block;
    object-fit: contain;
    object-position: center;
    width: 100%;
    height: 100%;
    overflow: hidden;
    transition: all .2s ease-in-out;
    &:hover {
    transform: scale(1.1);
  }
`;

export const Text = styled.div`
  z-index: 2;
  bottom: 0;
  left: 0;
  width: 100%;
  /* padding: 1em; */
  h3 {
    width: 100%;
    left: 0%;
    font-size: 1.25em;
    /* text-transform: uppercase; */
    margin: 0;
    color: var(--color-text-sub);
    ${responsive.smAndLess} {
      text-align: center;
    }
  }
  p {
    color: var(--color-text-main);
    margin-top: 16px;
  }
`;

export const Price = styled.span`
  color: inherit;
  font-weight: bold;
`;
