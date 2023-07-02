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
import { Message } from 'ui';

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
    console.log(error);
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
              een instituut waar de focus vooral op Huidverbetering of Skincare
              ligt. Je krijgt een persoonlijke behandeling met professionele
              opvolging van jouw huidbehandelingen."
          />
        </Head>
        <Message>
          Verlof van donderdag 29 juni tot woensdag 12 juli. In deze periode
          worden er geen bestellingen verstuurd en is het niet mogelijk deze af
          te halen.
        </Message>
        <Header>
          <H1>skincoach anniek lambrecht</H1>
        </Header>
        <HeroSection>
          <HeroText>
            <p>
              Hey Beauty!
              <br />
              Wil jij een ook mooie gezonde huid? Dan ben je bij mij aan het
              juiste adres.
            </p>
            <p>
              Mijn zaak is geen klassiek schoonheidsinstituut maar een instituut
              waar de focus op Huidverbetering of Skincare ligt.
            </p>
            <p>
              {' '}
              Je krijgt een persoonlijke behandeling met professionele opvolging
              van jouw huidbehandelingen.
            </p>
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
                href="https://www.instagram.com/annieklambrecht/"
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
            height="450"
            priority="true"
          />
        </HeroSection>
        <SubSection>
          <Link href="/behandelingen" passHref>
            <SectionOne>
              <H2>BEHANDELINGEN</H2>
              <ImageWrapper>
                <SubSectionImage
                  src="/static/subsection-behandelingen.jpg"
                  alt="anniek lambrecht - behandelingen"
                  width="456px"
                  height="304px"
                />
              </ImageWrapper>
              <SubSectionText>
                Op het menu staan niet alleen Huidanalyse, Peeling en Vitamine
                Gelaatsbehandelingen maar ook Microneedling en Laserbehandeling.
                Liften van de huid is mogelijk voor gelaat en lichaam met het
                LPG apparaat. Ongewenste haren, Couperose en Pigment behandelen
                we met de Clarity 2 Laser.{' '}
              </SubSectionText>
              <Link href="/behandelingen">
                <StyledLink>Ontdek alle behandelingen</StyledLink>
              </Link>
            </SectionOne>
          </Link>
          <Link href="/webshop" passHref>
            <SectionTwo>
              <H2>WEBSHOP</H2>
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
                zoveel mogelijk tegen. Ze zijn op basis van Vitamine A en
                Antioxidanten en compenseren het chronisch tekort hiervan in de
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
