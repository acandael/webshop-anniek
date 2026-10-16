import styled from 'styled-components';
import { responsive } from 'ui';
import Image from 'next/image';

export const List = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1rem;

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

export const PromotionWrapper = styled.div`
  /*/*position: relative;*/
  z-index: 1;*/
  overflow: visible;
  /* height: 100%; */
  display: flex;
  align-items: flex-start;
  gap: 24px;
  margin-bottom: 112px;

  ${responsive.smAndLess} {
    display: block;
    width: 100%;
    min-width: 100%;
  }
`;

export const HeroImage = styled(Image)`
  object-fit: contain;
  max-height: 750px;
  width: auto;

  ${responsive.smAndLess} {
    max-height: 900px;
    width: 100%;
    object-fit: contain;
  }

  ${responsive.smAndLess} {
    max-height: 800px;
    width: 100%;
    object-fit: contain;
  }
`;
