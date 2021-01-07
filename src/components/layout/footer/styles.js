import styled from 'styled-components';

export const Outer = styled.footer`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  max-width: 1440px;
  margin: 50px auto;
  border-top: 2px solid var(--color-box-background);
  padding: 50px 50px;
  justify-content: space-between;
  background-color: #EFEAEA;
`;

export const Logo = styled.div`
  width: 100px;
`;

export const NavList = styled.footer`
  list-style: none;
  font-weight: 500;
  font-size: 1rem;
  display: block;
  margin: 0 0 0 5px;

  li {
    line-height: 1.6rem;
  }
  h3 {
    font-size: 20px;
    font-weight: 400;
    margin-bottom: 16px;
  }
`;

export const Legal = styled.div`
  list-style: none;
  display: block;

`
