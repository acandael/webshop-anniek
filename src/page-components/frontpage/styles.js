import styled from 'styled-components';

import { Outer as O, Header as H, H1 as h1, H2 as h2 } from 'ui';

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

export const H2 = styled(h2)`
  font-size: 25px;
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

export const CTAButton = styled.button`
  background-color: #DCA090;
  color: white;
  width: 221px;
  height: 66px;
  margin-top: 3.5rem;
  margin-right: 1rem;
  font-weight: 600;

  :hover {
    background-color: #FAC7B9;
    transition: 0.2s;
  }
`

export const CTAText = styled.span`
  font-size: .9rem;
`

export const SubSection = styled.section`
  display: flex;
  justify-content: space-between;
  padding-left: 50px;
  padding-right: 139px;
  margin-top: 189px;
`

export const SectionOne = styled.div`
  max-width: 456px;
`
export const SectionTwo = styled.div`
  max-width: 456px;
`
export const SubSectionText = styled.p`
  
`

export const SubSectionImage = styled.img`
  border: solid 1px #D4D4D4;
  margin-bottom: 48px;
  margin-top: 48px;
  width: 456px;
  height: 304px;
`

export const StyledLink = styled.a`
  margin-top: 1rem;
  color: #DCA090;
`
