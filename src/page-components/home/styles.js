import styled from 'styled-components';
import Image from 'next/image';
import {
  responsive,
  Outer as outer,
  Header as H,
  H1 as h1,
  H2 as h2,
  Button as button
} from 'ui';

export const Outer = styled(outer)`
  margin-bottom: 64px;
  padding-left: 138px;
  padding-right: 138px;

  ${responsive.smAndLess} {
    margin: 0 24px;
    padding-left: 0;
    padding-right: 0;
  }
`;

export const Header = styled(H)`
  margin: 106px 0;
  padding: 0;
  ${responsive.smAndLess} {
    margin: 0;
  }
`;
export const H1 = styled(h1)`
  font-size: 39px;
  font-weight: 500;

  ${responsive.smAndLess} {
    font-size: 25px;
    text-align: center;
  }
`;

export const H2 = styled(h2)`
  font-size: 25px;
`;

export const HeroSection = styled.section`
  display: flex;
  justify-content: space-between;
  margin-top: 84px;
  ${responsive.smAndLess} {
    flex-direction: column-reverse;
  }
`;

export const HeroText = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  ${responsive.smAndLess} {
    width: 100%;
    margin-top: 48px;
  }

  p {
    font-size: 20px;
    font-weight: 400;
    font-family: var(--font-family-main);
    color: var(--color-text-sub);

    ${responsive.smAndLess} {
      margin-bottom: 16px;
    }
  }
`;

export const Button = styled(button)`
  ${responsive.smAndLess} {
    margin-top: 32px;
  }
`;

export const HeroImage = styled(Image)``;

export const CTAText = styled.span`
  font-size: 0.9rem;
`;

export const SubSection = styled.section`
  display: flex;
  justify-content: space-between;

  margin-top: 189px;

  ${responsive.smAndLess} {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 128px 0;
  }

  h2 {
    ${responsive.smAndLess} {
      text-align: center;
    }
  }
`;

export const SectionOne = styled.div`
  max-width: 456px;
  &:hover {
    cursor: pointer;
  }
`;
export const SectionTwo = styled.div`
  max-width: 456px;
  &:hover {
    cursor: pointer;
  }

  ${responsive.smAndLess} {
    margin-top: 64px;
  }
`;
export const SubSectionText = styled.p``;

export const ImageWrapper = styled.div`
  margin-top: 32px;
  margin-bottom: 32px;
`;

export const SubSectionImage = styled(Image)`
  border: solid 1px #d4d4d4;
`;

export const StyledLink = styled.a`
  display: block;
  margin-top: 1rem;
  color: #dca090;
`;
