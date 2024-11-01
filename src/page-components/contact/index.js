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
              De Smet De Naeyerlaan 76, 8370
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
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2493.9465037317973!2d3.126440513050012!3d51.31210852483249!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c4aa7c496e0937%3A0x87e2edff7da95830!2sDe%20Smet%20de%20Naeyerlaan%2076%2C%208370%20Blankenberge!5e0!3m2!1snl!2sbe!4v1730467930004!5m2!1snl!2sbe"
          width="100%"
          height="650"
          allowfullscreen
          loading="lazy"
        ></iframe>
      </GoogleMap>
    </Layout>
  );
}
