import React from 'react';

import Layout from 'components/layout';
import { simplyFetchFromGraph } from 'lib/graph';
import fragments from 'lib/graph/fragments';
import { useT } from 'lib/i18n';
import { Message } from 'ui';
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
import { fromPairs } from 'lodash';

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

export default function FrontPage({ catalogue, preview }) {
  const t = useT();
  const [grid] =
    catalogue?.components?.find((c) => c.type === 'gridRelations')?.content
      ?.grids || [];

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
          <b>Gesloten op 30 september en 4 oktober. </b>
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
              juiste adres. Mijn zaak is geen klassiek schoonheidsinstituut maar
              een instituut waar de focus vooral op Huidverbetering of Skincare
              ligt. Je krijgt een persoonlijke behandeling met professionele
              opvolging van jouw huidbehandelingen. Volg je mij al op{' '}
              <a
                href="https://www.facebook.com/annieklambrechtskincoach/?ref=hl"
                target="_blank"
              >
                Facebook
              </a>{' '}
              &{' '}
              <a
                href="https://www.instagram.com/annieklambrecht/"
                target="_blank"
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
            src="/static/homepage-2.jpg"
            alt="anniek lambrecht"
            width="450"
            height="450"
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
                Gelaatsbehandelingen maar ook Microneedling. Liften van de huid
                is mogelijk voor gelaat en lichaam met het LPG apparaat.
                Ongewenste haren verwijderen we met de Lightsheer Diode Laser.{' '}
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
                  src="/static/subsection-webshop.jpg"
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
