import styled from 'styled-components';
import { Image } from '@crystallize/react-image';

import { H1 as title, H2 as H, Inner as I, responsive } from 'ui';

export const Outer = styled(I)`
  margin: 0 auto;
  ${responsive.mdPlus} {
    max-width: var(--content-max-width);
  }
`;

export const Hero = styled.div`
  font-size: 20px;
  margin-bottom: 50px;
  ${responsive.mdPlus} {
    display: grid;
    grid-template-columns: minmax(600px, 1000px) minmax(300px, 1fr);
  }
`;

export const HeroContent = styled.div`
  margin-bottom: 50px;
  ${responsive.smPlus} {
    max-width: 800px;
  }
  // Paragraph generated by the ContentTransformer
  p {
    font-size: 20px;
    line-height: 36px;
    font-weight: 400;
  }
`;

export const Byline = styled.div`
  font-size: 16px;
  padding-bottom: 15px;
  span {
    margin-right: 10px;
  }
`;

export const Title = styled(title)`
  
`;

export const HeroImage = styled.div`
  display: grid;
  grid-gap: 5px;
  grid-template-columns: repeat(2, 1fr);
  margin-bottom: 100px;
  > figure:first-child {
    grid-column-end: span 2;
  }
`;

export const Img = styled(Image)`
  height: 100%;
  overflow: hidden;
  width: 100%;
  > img {
    display: block;
    height: 100%;
    object-fit: cover;
    object-position: center;
    overflow: hidden;
    width: 100%;
  }
`;

export const PageContentLayout = styled.div`
  display: grid;
  grid-gap: 200px;
  grid-template-columns: 1fr;
  ${responsive.mdPlus} {
    grid-template-columns: minmax(600px, 1000px) minmax(300px, 1fr);
  }
`;

export const Article = styled.article`
  p,
  li {
    margin-left: 25px !important;
    margin-right: 25px;
    ${responsive.mdPlus} {
      padding-right: 100px;
      margin-left: 50px !important;
      margin-right: 0;
    }
  }
  h2 {
    font-size: var(--font-size-md);
  }
  h3 {
    margin-left: 25px;
    font-size: var(--font-size-md);
    line-height: 38px;
    ${responsive.mdPlus} {
      margin-left: 50px;
    }
  }
`;

export const List = styled.div`
  display: grid;
  grid-gap: 5px;
`;

export const H2 = styled(H)`
  color: var(--color-text-main);
  font-size: 1rem;
`;

export const Sidebar = styled.div`
  margin-top: -15px;
  overflow-y: auto;
`;

export const SidebarBlock = styled.aside`
  display: block;
  margin-bottom: 50px;
  padding-bottom: 10px;
`;