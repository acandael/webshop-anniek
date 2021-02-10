import styled from 'styled-components';
import { Image } from '@crystallize/react-image';

export const Outer = styled.a`
  height: 100%;
  color: var(--color-primary-action-content);
  position: relative;
  display: flex;
  align-items: center;
  background: var(--color-primary-action);
  padding: 15px 25px;
  transition: all 0.1s ease-in-out;
  box-shadow: 0 0px 0px rgba(0, 0, 0, 0);
  border: 4px solid #fff;
`;

export const Text = styled.div`
  z-index: 2;
  bottom: 0;
  left: 0;
  width: 100%;
  h3 {
    font-size: var(--font-size-sm);
    text-align: center;
    font-weight: 600;
    margin: 0 0 0 5px;
    color: inherit;
  }
`;

export const ImageWrapper = styled.div`
  position: relative;
  z-index: 1;
  overflow: hidden;
  margin-top: 32px;
  margin-bottom: 32px;
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
  }
`;