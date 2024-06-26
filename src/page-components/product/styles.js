import styled from 'styled-components';
import is from 'styled-is';
import { responsive, H1, Inner as I } from 'ui';

export const Inner = styled(I)`
  display: flex;
  flex-direction: column-reverse;
  padding: 0 15px;
  ${responsive.smPlus} {
    display: grid;
    padding: 0 30px;
    grid-template-columns: repeat(12, 1fr);
    column-gap: 30px;
    grid-template-areas: 'content content content content content content content actions actions actions actions actions';
  }
  ${responsive.mdPlus} {
    margin-top: 64px;
    padding-left: 100px;
    padding-right: 100px;
    column-gap: initial;
    grid-template-areas: 'content content content content content content content . actions actions actions actions';
  }
  ${responsive.smAndLess} {
    margin-left: 24px;
    margin-right: 24px;
    padding: 0;
  }
  figcaption {
    margin-top: 0.5rem;
  }
`;

export const BreadcrumbWrapper = styled.div`
  padding-left: 100px;

  ${responsive.smAndLess} {
    margin-left: 24px;
    padding-left: 0;
  }
`;

export const Content = styled.div`
  // vertical space between the actions and the content
  margin-top: 30px;
  ${responsive.smPlus} {
    // Remove the vertical space because now they are placed next to each other
    margin-top: 0;
    grid-area: content;
  }
`;

export const Actions = styled.div`
  ${responsive.smPlus} {
    grid-area: actions;
  }

  ${responsive.smAndLess} {
    margin-top: 64px;
  }
`;

export const ActionsSticky = styled.div`
  // Adding styles only when they are needed makes the calculation of CSSOM faster
  ${responsive.smPlus} {
    position: sticky;
    top: 50px;
  }
`;

export const Description = styled.div`
  color: var(--color-text-sub);
  ${responsive.mdPlus} {
    /* padding: 100px 0; */
    margin-top: 50px;
  }
`;
export const DescriptionWrapper = styled.div`
  p,
  li {
    /* margin-left: 25px !important;
    margin-right: 25px; */
    ${responsive.mdPlus} {
      padding-right: 100px;
      /* margin-left: 50px !important; */
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

export const Media = styled.div`
  position: relative;
  display: flex;
  flex-wrap: wrap;
`;

// Creating a gallery based on image orientation
export const ImgContainer = styled.div`
  border: 4px solid #fff;
  width: 50%;
  max-width: 100%;
  flex-grow: 1;
  position: relative;
  figure {
    height: 100%;
  }
  img {
    object-fit: var(--image-object-fit);
    overflow: hidden;
    width: 100%;
    height: 100%;
    border: 1px solid #dfdfdf;
  }
  ${is('portrait')`
    width:33.333%;
    max-width:50%;
    &:only-child {
      max-width:100%;
      width:100%
    }
  `}
  &:first-child {
    width: 100%;
  }
`;

export const Title = styled(H1)`
  font-size: var(--font-size-xl);
  font-weight: 500;
`;

export const Summary = styled.div`
  color: var(--color-text-sub);
  font-size: var(--font-size-body);
  line-height: 1.4;
  margin-bottom: 15px;
`;

export const ProductFooter = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px 0 15px;
  border-top: 1px solid #cecece;
  border-bottom: 1px solid #cecece;
  align-items: center;
  ${responsive.mdPlus} {
    margin-bottom: 0;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  button {
    ${responsive.mdPlus} {
      flex-grow: 0;
    }
  }
`;

export const Price = styled.div`
  align-items: center;
  color: var(--color-text-sub);
  display: flex;
  flex-direction: column;
  font-size: var(--font-size-lg);
  margin-bottom: 20px;
  margin-top: 20px;
  ${is('discounted')`
    color:var(--color-discount);
  `}
  ${responsive.xs} {
    flex-grow: 1;
  }
  ${responsive.mdPlus} {
    margin-right: 20px;
  }
`;

export const DiscountDetails = styled.span`
  display: block;
  display: flex;
  font-size: 0.55em;
  font-weight: 400;
  justify-content: space-between;
  text-align: left;
`;

export const BeforePrice = styled.div`
  color: var(--color-text-sub);
  opacity: 0.6;
  padding: 5px 0;
  text-decoration: line-through;
`;

export const Percentage = styled.div`
  font-weight: 600;
  padding: 5px 15px;
`;

export const RelatedContainer = styled(I)`
  margin-top: 100px;
  min-height: 0;
`;

export const Usage = styled.div`
  color: var(--color-text-sub);
  flex: 0 1 100%;
  /* background: var(--color-box-background); */
  padding: 5rem 0;
  h2:empty {
    display: none;
  }
  ul {
    margin: 1rem 0;
    padding-left: 1.2rem;
    li {
      margin-bottom: 0.5rem;
    }
  }
`;

export const Quantity = styled.div`
  margin-top: 50px;
  font-weight: 600;
`;
