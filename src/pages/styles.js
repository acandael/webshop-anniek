import styled from 'styled-components';

import { Outer as outer, Header as H, H1 as h1, H2 as h2 } from 'ui';

export const Outer = styled(outer)`
  padding-left: 138px;
  padding-right: 138px;
`

export const Header = styled(H)`
  margin: 106px 0;
  padding: 0;
`
export const H1 = styled(h1)`
  font-size: 39px;
`

export const H2 = styled(h2)`
  font-size: 25px;
`

export const HeroSection = styled.section`
  display: flex;
  justify-content: space-between;
  margin-top: 84px;
`

export const HeroText = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  p {
    font-size: 20px;
  color: var(--color-text-sub);
  }
`;

export const HeroImage = styled.div`
  
`

export const CTAText = styled.span`
  font-size: .9rem;
`

export const SubSection = styled.section`
  display: flex;
  justify-content: space-between;
  
  margin-top: 189px;
`

export const SectionOne = styled.div`
  max-width: 456px;
  &:hover {
    cursor: pointer;
  }
`
export const SectionTwo = styled.div`
  max-width: 456px;
  &:hover {
    cursor: pointer;
  }
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