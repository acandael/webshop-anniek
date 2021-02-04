import styled from 'styled-components';

import { responsive, H1 } from 'ui';


export const ShapeContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

export const Loader = styled.div`
  text-align: center;
  margin: 50px;
  font-size: 2rem;
`;

export const Sections = styled.div`
  display: flex;
  align-items: top;
  /* background: var(--color-box-background); */
  margin-top: 130px;
  margin-left: 0;
  flex-direction: row-reverse;
  justify-content: center;

  ${responsive.smAndLess} {
    padding: 20px 0px;
    margin: 0 10px;
    display: block;
  }
`;

export const Content = styled.div`
  display: flex;
  margin-top: 15px;
  ${responsive.xs} {
    margin: 10px 10px 0;
    display: block;
  }
`;

export const Description = styled.div`
  color: var(--color-text-sub);
  flex: 0 1 100%;
  /* background: var(--color-box-background); */
  margin-top: 32px;
  margin-bottom: 0;
  padding: 0 0;
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

export const Media = styled.div`
  flex: 0 0 50%;
  position: relative;
  padding: 3rem;
  ${responsive.mdAndLess} {
    display: block;
    padding: 0;
    margin-bottom: 2em;
  }
`;

export const MediaInner = styled.div`
  ${responsive.mdAndLess} {
    margin: 2em;
  }

  img {
    object-fit: contain;
    max-height: 80vh;
    width: 100%;
    height: 100%;

    ${responsive.mdAndLess} {
      max-height: 40vh;
    }
  }
`;



export const Info = styled.div`
  flex: 1 1 auto;
  margin: 0;

  ${responsive.smAndLess} {
    margin: 2em;
  }
`;
export const Name = styled(H1)`
  font-size: 2rem;
  font-weight: 900;
  text-transform: uppercase;
`;

export const Summary = styled.div`
  color: var(--color-text-sub);
  font-size: 18px;
  line-height: 1.4;
  margin-bottom: 15px;
`;

export const ProductFooter = styled.div`
  display: flex;
  
  padding: 24px 0 0;
  justify-content: space-between;
  /* border-top: 1px solid #cecece; */
  align-items: center;

  ${responsive.xs} {
    button {
      flex-grow: 1;
      margin: 1rem 0;
    }
  }
`;

export const Price = styled.div`
  text-align: center;
  color: var(--color-text-sub);
  font-size: 30px;
  margin: 20px;
  margin-left: 0;

  strong {
    display: inline-block;
    margin-left: 5px;
  }

  span {
    font-size: 16px;
  }

  ${responsive.xs} {
    flex-grow: 1;
  }
`;
