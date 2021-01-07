import React from 'react';
import Link from 'next/link';


import { Outer, Logo, NavList, Legal } from './styles';

export default function Footer() {
  


  return (
    <Outer>
      <NavList>
      <Link href="/">
        <a>
          <Logo>
            <img src="/static/anniek-lambrecht-logo.png" alt="logo anniek lambrecht" width="100" height="100" />
          </Logo>
        </a>
      </Link>
      </NavList>
      <NavList>
        <li>&copy; 2021 Copyright Anniek Lambrecht</li>
        <li>Alle rechten voorbehouden</li>
        <li>Voorwaarden - Disclaimer - Privacyverklaring</li>
      </NavList>
      <NavList>
        <h3>MENU</h3>
          <li>
            <Link href="/behandelingen">
              <a>Behandelingen</a>
            </Link>
          </li>
          <Link href="/contact">
              <a>Contact</a>
          </Link>
        
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
            <Link href="/kadobon">
              <a>Kadobon</a>
            </Link>
          </li>
        
      </NavList>
      <NavList>
        <h3>CONTACT</h3>
          <li>
          Schoonheidsinstituut Anniek Lambrecht<br />
          L. Dujardinstraat 9<br />
          8370 Blankenberge
          </li>
          <li>
          050 69.41.65<br />
          info@anniek-lambrecht.be
          </li>
        
      </NavList>
      
    </Outer>
  );
}
