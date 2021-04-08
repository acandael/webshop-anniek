import styled from 'styled-components';
import is from 'styled-is';
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

  ${responsive.smAndLess} {
    margin-bottom: 64px;
  }
`;

export const ImageWrapper = styled.div`
  position: relative;
  z-index: 1;
  overflow: hidden;
  margin-top: 0;
  margin-bottom: 24px;
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
    transition: all 0.2s ease-in-out;
    &:hover {
      transform: scale(1.1);
    }
  }
`;

export const Text = styled.div`
  z-index: 2;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 1em;
  h3 {
    font-size: 1em;
    text-transform: uppercase;
    margin: 0;
    margin-bottom: 32px;
    color: var(--color-text-sub);

    ${responsive.smAndLess} {
      text-align: center;
      font-size: 1.5em;
    }
  }

  p {
    color: var(--color-text-main);
  }
`;

export const Price = styled.span`
  color: var(--color-price);
  position: relative;
  margin-top: 16px;
  font-weight: bold;
  display: flex;
  font-size: var(--font-listing-price-size);
  padding-bottom: 5px;
  align-items: center;
  ${is('discounted')`
    color:var(--color-discount);
  `}
`;
