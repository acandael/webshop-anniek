import React from 'react';
import Link from 'next/link';

import { Outer, Logo, NavList, Powered } from './styles';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <Outer>
      <Powered>
        <a>
          <Logo>
            <img
              src="/static/logo-header-3.jpg"
              alt="logo anniek lambrecht"
              width="300"
              height="92"
            />
          </Logo>
        </a>
        <p>
          &copy; {currentYear} Copyright Anniek Lambrecht
          <br />
          Alle rechten voorbehouden
          <br />
          Voorwaarden - Disclaimer - Privacyverklaring
        </p>
        <p>
          Web development: <a href="https://www.webmoov.be">Webmoov</a>
        </p>
      </Powered>
      <NavList>
        <h3>Menu</h3>
        <li>
          <Link href="/behandelingen">Behandelingen</Link>
        </li>
        <li>
          <Link href="/contact">Contact</Link>
        </li>
      </NavList>
      <NavList>
        <h3>Webshop</h3>

        <li>
          <Link href="/webshop/zo-skin-health-1">Zo Skin Health</Link>
        </li>
        <li>
          <Link href="/merken/environ">Environ</Link>
        </li>
        <li>
          <Link href="/merken/jane-iredale">Jane Iredale</Link>
        </li>
        <li>
          <Link href="#">Heliocare</Link>
        </li>
        <li>
          <Link href="/merken/advanced-nutrition-programme">
            Advanced Nutrition Programme
          </Link>
        </li>
        <li>
          <Link href="#">Insentials</Link>
        </li>
        <li>
          <Link href="/kadobon">Kadobon</Link>
        </li>
        <li>
          Artikelen kunnen, ongeopend, tot 14 dagen na aankoop terug gestuurd
          worden.
        </li>
        <li>Betaalmogelijkheden: Bancontact, Visa, Mastercard</li>
      </NavList>
      <NavList>
        <h3>Contact</h3>
        <li>
          Skincenter Anniek Lambrecht
          <br />
          De Smet De Naeyerlaan 74
          <br />
          8370 Blankenberge
        </li>
        <li>
          tel: <a href="tel:050 69.41.65">050 69.41.65</a>
          <br />
          <a href="mailto:info@anniek-lambrecht.be">info@anniek-lambrecht.be</a>
        </li>
        <li>
          IBAN: BE42731032939454
          <br />
          BTW:BE0536204914
        </li>
      </NavList>
    </Outer>
  );
}
