import styled from 'styled-components';
import { Image } from '@crystallize/react-image';

import { responsive } from 'ui';

export const Outer = styled.a`
  display: block;
  height: 100%;
  color: var(--color-main-background);
  position: relative;
  padding: 1em;
  /* background: var(--color-box-background); */
  grid-column-end: span 4;
  ${responsive.xs} {
    margin-bottom: 15px;
  }
`;

export const ImageWrapper = styled.div`
  position: relative;
  z-index: 1;
  overflow: hidden;
  border: 1px solid var(--color-box-background);
  margin-bottom: 24px;
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
    /* border-radius: 12px; */
  }
`;

export const Text = styled.div`
  z-index: 2;
  bottom: 0;
  left: 0;
  width: 100%;
  /* padding: 1em; */
  
  h3 {
    font-size: 1.25em;
    /* text-transform: uppercase; */
    color: var(--color-text-sub);
    margin-bottom: 32px;

    ${responsive.smAndLess} {
      text-align: center;
      font-size: 1.5em;
    }
  }

  p {
    color: var(--color-text-main);
    margin-top: 64px;
  }
`;
