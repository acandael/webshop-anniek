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
            <Link href="https://schoonheidsinstituut-anniek-lambrecht-1.salonized.com/bookings/new?">
              <Button width="221px">Boek Nu</Button>
            </Link>
            <p>
              Bij Skincenter draait alles om <strong>transformatie</strong>,
              niet alleen van je huid maar ook van hoe je jezelf ziet. Met{' '}
              <strong>actieve cosmeceutische producten</strong> en geavanceerde
              technologie brengen we jouw huid in topvorm, terwijl jij je
              zelfvertrouwen herwint. Elk traject begint met een grondige
              huidanalyse en een aanpak op maat, zodat je niet alleen een
              stralende huid krijgt, maar ook een goed gevoel van binnenuit.
            </p>
            <p>
              De lotusbloem, staat voor{' '}
              <strong>innerlijke kracht en groei</strong>. Net zoals deze bloem
              zich vanuit haar wortels naar het licht ontvouwt, geloven wij in
              de kracht van zelfontplooiing.
            </p>
            <p>
              Stap voor stap zie je jezelf weer stralen, klaar om
              volzelfvertrouwen de wereld tegemoet te treden.  
            </p>
            <p>
              Anniek is het hart van Skincenter. Met meer dan 10 jaar ervaring
              en een diepe <strong>passie voor huidverbetering</strong> zorgt ze
              voor een persoonlijke aanpak die écht werkt. Na zelf lange tijd te
              hebben geworsteld met huidproblemen, weet ze als geen ander hoe
              belangrijk het is om je goed in je vel te voelen.
            </p>
            <p>
              Bij <strong>Anniek</strong> ben je geen nummer. Ze{' '}
              <strong>luistert, analyseert, en creëert</strong>
              een behandeltraject op maat, altijd met oog voor jouw wensen en
              verwachtingen. Haar warme, no-nonsense aanpak maakt het makkelijk
              om je op je gemak te voelen, zodat je samen met haar stappen kunt
              zetten naar een gezondere, stralende huid.
            </p>
            <p>
              Dankzij haar expertise en opleidingen in binnen- en buitenland
              stemt Anniek <strong>behandelingen en thuisverzorging</strong>{' '}
              perfect op elkaar af. Peelings, microneedling en laserinstellingen
              worden doordacht gecombineerd voor maximale huidverbetering. Elk
              behandelplan is uniek en gericht op de{' '}
              <strong>beste, duurzame resultaten</strong>.{' '}
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
                href="https://www.instagram.com/skincenter_anniek_lambrecht/"
                target="_blank"
                rel="noreferrer"
              >
                Instagram
              </a>
              ?
            </p>
          </HeroText>
          <HeroImage
            src="/static/anniek.jpg"
            alt="anniek lambrecht"
            width={450}
            height={675}
            priority
          />
        </HeroSection>
        <SubSection>
          <Link href="/behandelingen">
            <SectionOne>
              <H2>Behandelingen</H2>
              <ImageWrapper>
                <SubSectionImage
                  src="/static/subsection-behandelingen.jpg"
                  alt="anniek lambrecht - behandelingen"
                  width={456}
                  height={304}
                />
              </ImageWrapper>
              <SubSectionText>
                Op het menu staan niet alleen huidanalyse, peeling en vitamine
                gelaatsbehandelingen maar ook microneedling en laserbehandeling.
                Liften van de huid is mogelijk voor gelaat en lichaam met het
                LPG apparaat. Ongewenste haren, couperose en pigment behandelen
                we met de Clarity 2 Laser.{' '}
              </SubSectionText>
              <StyledLink>Ontdek alle behandelingen</StyledLink>
            </SectionOne>
          </Link>
          <Link href="/webshop">
            <SectionTwo>
              <H2>Webshop</H2>
              <ImageWrapper>
                <SubSectionImage
                  src="/static/webshop.jpg"
                  alt="anniek lambrecht - webshop"
                  width={456}
                  height={304}
                />
              </ImageWrapper>
              <SubSectionText>
                Met de producten van Advanced Nutricion Programme, Environ
                Skincare en Jane Iredale houden we het huidverouderingsproces
                zoveel mogelijk tegen. Ze zijn op basis van vitamine A en
                antioxidanten en compenseren het chronisch tekort hiervan in de
                huid.
              </SubSectionText>
              <StyledLink>Ontdek alle producten</StyledLink>
            </SectionTwo>
          </Link>
        </SubSection>
      </Outer>
    </Layout>
  );
}
