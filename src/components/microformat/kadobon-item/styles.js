import styled from 'styled-components';
import { Image } from '@crystallize/react-image';
import is from 'styled-is';

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
    text-transform: uppercase;
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
  color: var(--color-price);
  position: relative;
  font-weight: bold;
  display: flex;
  font-size: var(--font-listing-price-size);
  padding-bottom: 5px;
  align-items: center;
  ${is('discounted')`
    color:var(--color-discount);
  `}
`;

export const BeforePrice = styled.div`
  font-size: 0.8em;
  opacity: 0.7;
  padding: 0 15px 0 5px;
  font-weight: 500;
  text-decoration: line-through;
  color: var(--color-price);
`;

export const Percentage = styled.div`
  font-size: 12px;
  margin-top: 10px;
  position: absolute;
  right: 0;
  top: 0;
  background: var(--color-discount);
  color: #fff;
  display: inline-block;
  border-radius: 2px;
  z-index: 15;
  padding: 5px 10px;
  font-weight: 600;
`;