import styled from 'styled-components';

import { Outer as O, Header as H, H1 as h1 } from 'ui';

export const Outer = styled(O)`
  max-width: 1440px;
  padding-left: 138px;
`;

export const Header = styled(H)`
  margin-top: 53px;
`
export const H1 = styled(h1)`
  font-size: 39px;
`

export const HeroSection = styled.section`
  display: flex;
  padding-left: 50px;
`

export const HeroText = styled.div`
  width: 50%;
  font-size: 20px;
`;

export const HeroImage = styled.div`
  width: 50%;
  margin-left: 157px;
`
