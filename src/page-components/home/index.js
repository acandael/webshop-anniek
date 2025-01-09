import React from 'react';

import Layout from 'components/layout';
import { simplyFetchFromGraph } from 'lib/graph';
import fragments from 'lib/graph/fragments';
import {
  Outer,
  Header,
  H1,
  H2,
  HeroSection,
  HeroText,
  HeroImage,
  Button,
  SubSection,
  SectionOne,
  SectionTwo,
  SubSectionText,
  ImageWrapper,
  SubSectionImage,
  StyledLink
} from './styles';
import Link from 'next/link';
import Head from 'next/head';
//import { Message } from 'ui';

export async function getData({ language, preview = null }) {
  try {
    const { data } = await simplyFetchFromGraph({
      query: `
        query FRONTPAGE($language: String!, $path: String!,  $version: VersionLabel!) {
          catalogue(path: $path, language: $language, version: $version) {
            ...item
            ...product
          }
        }
        ${fragments}
      `,
      variables: {
        language,
        path: '/web-frontpage',
        version: preview ? 'draft' : 'published'
      }
    });
    return { ...data, preview };
  } catch (error) {
    return null;
  }
}

export default function FrontPage({ preview }) {
  return (
    <Layout preview={preview}>
      <Outer>
        <Head>
          <meta
            name="description"
            content="Mijn zaak is geen klassiek schoonheidsinstituut maar
              een instituut waar de focus op huidbehandeling of skincare
              ligt. Je krijgt een persoonlijke behandeling met professionele
              opvolging van je huidbehandelingen."
          />
        </Head>
        {/* <Message>
          Verlof van donderdag 29 juni tot woensdag 12 juli. In deze periode
          worden er geen bestellingen verstuurd en is het niet mogelijk deze af
          te halen.
        </Message> */}
        <Header>
          <H1>Skincenter Anniek Lambrecht</H1>
        </Header>
        <HeroSection>
          <HeroText>
            <H2>
              We zijn verheugd om een tipje van de sluier op te lichten en ons
              nieuwe logo en huisstijl te presenteren!
            </H2>
            <p>
              Naar aanleiding van de uitbreiding en verhuizing van ons
              Skincenter hebben we gewerkt aan een rebranding, inclusief een
              nieuw logo en een frisse huisstijl. Ons nieuwe logo vertelt een
              bijzonder verhaal.
            </p>
            <p>
              Vaak zien we klanten binnenkomen met het hoofd naar beneden
              gebogen, onzeker over hun huid of lichaam. Samen starten we een
              traject van huidverbetering of lichaamscontouring en zien we stap
              voor stap hun hoofd omhoog gaan. Hun gelaatsuitdrukking en huid
              beginnen te stralen, en dat stralen nemen ze mee de wereld in.
            </p>
            <p>
              Daarom hebben we gekozen voor een moderne lotusbloem als ons
              nieuwe symbool. De lotus staat voor innerlijke schoonheid en
              transformeert zich van wortels in de aarde naar een prachtige
              bloem. Dit logo zal vanaf nu regelmatig terugkomen in onze nieuwe
              huisstijl.
            </p>
            <p>We heten je van harte welkom in ons nieuwe Skincenter.</p>
            <p>
              Volg je mij al op{' '}
              <a
                href="https://www.facebook.com/annieklambrechtskincoach/?ref=hl"
                target="_blank"
                rel="noreferrer"
              >
                Facebook
              </a>{' '}
              &amp;{' '}
              <a
                href="https://www.instagram.com/skincenter_anniek_lambrecht/"
                target="_blank"
                rel="noreferrer"
              >
                Instagram
              </a>
              ?
            </p>
            <Link
              href="https://schoonheidsinstituut-anniek-lambrecht-1.salonized.com/bookings/new?"
              passHref
            >
              <Button width="221px">Boek Nu</Button>
            </Link>
          </HeroText>
          <HeroImage
            src="/static/anniek.jpg"
            alt="anniek lambrecht"
            width="450"
            height="675"
            priority="true"
          />
        </HeroSection>
        <SubSection>
          <Link href="/behandelingen" passHref>
            <SectionOne>
              <H2>Behandelingen</H2>
              <ImageWrapper>
                <SubSectionImage
                  src="/static/subsection-behandelingen.jpg"
                  alt="anniek lambrecht - behandelingen"
                  width="456px"
                  height="304px"
                />
              </ImageWrapper>
              <SubSectionText>
                Op het menu staan niet alleen huidanalyse, peeling en vitamine
                gelaatsbehandelingen maar ook microneedling en laserbehandeling.
                Liften van de huid is mogelijk voor gelaat en lichaam met het
                LPG apparaat. Ongewenste haren, couperose en pigment behandelen
                we met de Clarity 2 Laser.{' '}
              </SubSectionText>
              <Link href="/behandelingen">
                <StyledLink>Ontdek alle behandelingen</StyledLink>
              </Link>
            </SectionOne>
          </Link>
          <Link href="/webshop" passHref>
            <SectionTwo>
              <H2>Webshop</H2>
              <ImageWrapper>
                <SubSectionImage
                  src="/static/webshop.jpg"
                  alt="anniek lambrecht - webshop"
                  width="456px"
                  height="304px"
                />
              </ImageWrapper>
              <SubSectionText>
                Met de producten van Advanced Nutricion Programme, Environ
                Skincare en Jane Iredale houden we het huidverouderingsproces
                zoveel mogelijk tegen. Ze zijn op basis van vitamine A en
                antioxidanten en compenseren het chronisch tekort hiervan in de
                huid.
              </SubSectionText>
              <Link href="/webshop">
                <StyledLink>Ontdek alle producten</StyledLink>
              </Link>
            </SectionTwo>
          </Link>
        </SubSection>
      </Outer>
    </Layout>
  );
}
