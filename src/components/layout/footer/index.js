import React from 'react';
import Link from 'next/link';

import { Outer, Logo, NavList, Powered } from './styles';

export default function Footer() {
  return (
    <Outer>
      <Powered>
        <a>
          <Logo>
            <img
              src="/static/logo-anniek-lambrecht-footer.png"
              alt="logo anniek lambrecht"
              width="100"
              height="100"
            />
          </Logo>
        </a>
        <p>
          &copy; 2021 Copyright Anniek Lambrecht
          <br />
          Alle rechten voorbehouden
          <br />
          Voorwaarden - Disclaimer - Privacyverklaring
        </p>
      </Powered>
      <NavList>
        <h3>MENU</h3>
        <li>
          <Link href="/behandelingen">
            <a>Behandelingen</a>
          </Link>
        </li>
        <li>
          <Link href="/contact">
            <a>Contact</a>
          </Link>
        </li>
      </NavList>
      <NavList>
        <h3>WEBSHOP</h3>

        <li>
          <Link href="/merk/environ">
            <a>Environ</a>
          </Link>
        </li>
        <li>
          <Link href="/merk/advanced-nutrition-programme">
            <a>Advanced Nutrition Programme</a>
          </Link>
        </li>
        <li>
          <Link href="/merk/jane-iredale">
            <a>Jane Iredale</a>
          </Link>
        </li>
        <li>
          <Link href="/webshop/skin-by-dings">
            <a>Skin By Dings</a>
          </Link>
        </li>
        <li>
          <Link href="/kadobon">
            <a>Kadobon</a>
          </Link>
        </li>
      </NavList>
      <NavList>
        <h3>CONTACT</h3>
        <li>
          Schoonheidsinstituut Anniek Lambrecht
          <br />
          L. Dujardinstraat 9<br />
          8370 Blankenberge
        </li>
        <li>
          <a href="tel:050 69.41.65">050 69.41.65</a>
          <br />
          <a href="mailto:info@anniek-lambrecht.be">info@anniek-lambrecht.be</a>
        </li>
      </NavList>
    </Outer>
  );
}
