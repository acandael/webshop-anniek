import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { useSettings } from 'components/settings-context';

import BurgerButton from './burger-button';
import BasketButton from './basket-button';
import Search from './search';
import {
  Outer,
  Nav,
  Logo,
  NavList,
  NavListItem,
  PreviewBar,
  IconBar
} from './styles';

export default function Header({ simple, preview }) {
  const { mainNavigation } = useSettings();
  const router = useRouter();

  const [navOpen, setNavOpen] = useState(false);

  return (
    <>
      {preview && (
        <PreviewBar>
          You are in preview mode (
          <a href={'/api/preview?leave=' + encodeURIComponent(router.asPath)}>
            leave
          </a>
          )
        </PreviewBar>
      )}
      <Outer simple={simple}>
        <Link href="/" passHref>
          <Logo>
            <img
              src="/static/logo-header-3.jpg"
              alt="logo Skincenter Anniek Lambrecht"
              width="300"
              height="92"
            />
          </Logo>
        </Link>
        <Nav open={navOpen}>
          <NavList>
            {mainNavigation?.map((category) => (
              <NavListItem key={category.path}>
                <Link href={category.path}>
                  <a onClick={() => setNavOpen(false)}>{category.name}</a>
                </Link>
              </NavListItem>
            ))}
            <NavListItem>
              <Link href="/contact">
                <a onClick={() => setNavOpen(false)}>Contact</a>
              </Link>
            </NavListItem>
          </NavList>
        </Nav>
        <IconBar>
          <Search />
          <BasketButton />
        </IconBar>
        <BurgerButton active={navOpen} onClick={() => setNavOpen(!navOpen)} />
      </Outer>
    </>
  );
}
