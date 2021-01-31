import styled from 'styled-components';
import { responsive } from 'ui';
import { Image } from '@crystallize/react-image';
import {Header, H3 as h3} from 'ui';

export const BehandelingHeader = styled(Header)`
  max-width: 1440px;
  padding: 0;
  margin-top: 98px;
  margin-bottom: 102px;
  h1 {
    text-align: left;
  }
`

export const HeroSection = styled.div`
  display: flex;
  justify-content: space-between;
`
export const HeroText = styled.div`
  display: flex;
  flex-direction: column;
  width: 40%;
  p {
    font-size: 16px;
  }

  ul li {
    font-size: 16px;
  }

  h3 {
    margin-top: 0;
    margin-bottom: 16px;
  }
`;

export const HeroImage = styled.div`
  
`
export const Img = styled(Image)`
  
  > img {
    object-fit: contain;
    object-position: center;
    
    /* overflow: hidden; */
    /* border-radius: 12px; */
  }
`;

export const PriceList = styled.div`
  display: flex;
  justify-content: space-around;
`
