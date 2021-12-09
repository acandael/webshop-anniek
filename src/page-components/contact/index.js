import React from 'react';

import { H1 } from 'ui';
import Layout from 'components/layout';
import {
  Outer,
  ContactHeader,
  H3,
  HeroSection,
  HeroText,
  GoogleMap
} from './styles';
import Breadcrumb from 'components/breadcrumb';
import { PhoneIcon, EmailIcon } from '@chakra-ui/icons';

export default function ContactPage() {
  return (
    <Layout
      title="contact"
      description="Op afspraak. Tijdens behandelingen wordt er niet opgenomen maar laat uw naam en telefoon na dan bel ik u zeker terug."
    >
      <Outer>
        <Breadcrumb path="/Home/contact" />
        <ContactHeader centerContent>
          <H1>Contact</H1>
        </ContactHeader>
        <HeroSection>
          <HeroText>
            <p>
              <EmailIcon color="brand.900" />
              <a href="mailto:info@anniek-lambrecht.be">
                info@anniek-lambrecht.be
              </a>
              <br />
              <PhoneIcon color="brand.900" />{' '}
              <a href="tel:050694165">050 69.41.65</a>
            </p>
            <p>
              L. Dujardinstraat 9, 8370
              <br />
              Blankenberge
            </p>
            <p>Ondernemingsnummer: BE0536204914</p>
            <H3>Openingsuren</H3>
            <p>
              Op afspraak. Tijdens behandelingen wordt er niet opgenomen maar
              laat uw naam en telefoon na dan bel ik u zeker terug.
            </p>
            <p>
              <strong>Gesloten op: Zaterdag, Zon- en Feestdagen</strong>
            </p>
          </HeroText>
        </HeroSection>
      </Outer>
      <GoogleMap>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2493.9281476296796!2d3.1223149154920717!3d51.31244623276007!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c4aa7945f9742b%3A0xc1a4892e7c8bc7df!2sAnniek+Lambrecht!5e0!3m2!1snl!2sbe!4v1522758563152"
          width="100%"
          height="650"
          frameborder="0"
          allowfullscreen
        ></iframe>
      </GoogleMap>
    </Layout>
  );
}
