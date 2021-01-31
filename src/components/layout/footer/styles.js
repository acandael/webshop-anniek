import styled from 'styled-components';

export const Outer = styled.footer`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  max-width: 1440px;
  margin: 50px auto;
  /* border-top: 2px solid var(--color-box-background); */
  padding: 50px 138px;
  justify-content: space-between;
  background-color: #EFEAEA;
`;

export const Logo = styled.div`
  width: 100px;
`;

export const NavList = styled.footer`
  list-style: none;
  font-size: 1rem;
  display: block;
  margin: 0 0 0 5px;

  li {
    line-height: 1.6rem;
    font-size: 0.9em;
    color: var(--color-text-sub)
  }
  h3 {
    font-size: 20px;
    font-weight: 400;
    margin-bottom: 16px;
  }
`;

export const Powered = styled.div`
  width: 100%;
  display: block;
  /* display: flex; */
  /* align-items: center; */
  font-size: 0.9em;
  p {
    margin: 0;
    color: var(--color-text-sub);
  }
  svg {
    width: 120px;
  }
`;
