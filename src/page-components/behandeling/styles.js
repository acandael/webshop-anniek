import styled from 'styled-components';
import { responsive } from 'ui';
import { Image } from '@crystallize/react-image';
import { Header, Button as button } from 'ui';

export const BehandelingHeader = styled(Header)`
  max-width: 1440px;
  padding: 0;
  margin-top: 98px;
  margin-bottom: 102px;
  h1 {
    text-align: left;
  }
`;

export const HeroSection = styled.div`
  display: flex;
  justify-content: space-between;

  ${responsive.smAndLess} {
    display: flex;
    flex-direction: column-reverse;
    align-items: center;
  }
`;
export const HeroText = styled.div`
  display: flex;
  flex-direction: column;
  width: 40%;
  padding-right: 16px;

  ${responsive.smAndLess} {
    width: 100%;
    padding-right: 0;
  }

  p {
    font-size: 16px;
  }

  ul li {
    font-size: 16px;
  }

  h3 {
    margin-top: 0;
    margin-bottom: 16px;
    ${responsive.smAndLess} {
      font-size: 24px;
      margin-bottom: 8px;
    }
  }
`;

export const Button = styled(button)`
  margin-bottom: 48px;

  ${responsive.smAndLess} {
    margin-top: 64px;
  }
`;

export const HeroImage = styled(Image)`
  object-fit: contain;
`;

// export const HeroImage = styled.div``;
// export const Img = styled(Image)`
//   > img {
//     object-fit: contain;
//     object-position: center;
//     border: 1px solid var(--color-box-background);

//     /* overflow: hidden; */
//     /* border-radius: 12px; */
//   }
// `;

export const PriceList = styled.div`
  display: flex;
  justify-content: space-around;
`;

export const Policy = styled.div`
  display: flex;
  justify-content: space-around;
`;
