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
  HeroImageSection,
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
import Script from 'next/script';
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
              De lotusbloem staat voor{' '}
              <strong>innerlijke kracht en groei</strong>. Net zoals deze bloem
              zich vanuit haar wortels naar het licht ontvouwt, geloven wij in
              de kracht van zelfontplooiing.
            </p>
            <p>
              Stap voor stap zie je jezelf weer stralen, klaar om vol
              zelfvertrouwen de wereld tegemoet te treden.  
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
              <strong>luistert, analyseert, en creëert</strong> een
              behandeltraject op maat, altijd met oog voor jouw wensen en
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
            <Script
              src="https://cdn.salonized.com/widget.js"
              data-name="salonized"
              data-microsite-url="https://schoonheidsinstituut-anniek-lambrecht-1.salonized.com"
              strategy="afterInteractive"
              onLoad={() => {
                if (
                  window.Salonized &&
                  typeof window.Salonized.init === 'function'
                ) {
                  window.Salonized.init();
                }
              }}
            />
            <div className="salonized-reviews"></div>
          </HeroText>
          <HeroImageSection>
            <HeroImage
              src="/static/homepage-anniek.jpg"
              alt="skincenter team"
              width={1000}
              height={750}
              priority
            />
            <HeroImage
              src="/static/homepage-team.jpg"
              alt="skincenter team"
              width={1000}
              height={750}
              priority
            />
          </HeroImageSection>
        </HeroSection>
        <SubSection>
          <Link href="/behandelingen">
            <SectionOne>
              <H2>Behandelingen</H2>
              <ImageWrapper>
                <SubSectionImage
                  src="/static/subsection-behandelingen.jpg"
                  alt="anniek lambrecht - behandelingen"
                  width={800}
                  height={602}
                />
              </ImageWrapper>
              <SubSectionText>
                Bij Skincenter Anniek Lambrecht in Blankenberge bieden we
                professionele huidverbetering met Observ 520 huidanalyse,
                Hydrafacial, SkinPen microneedling, chemische peelings en
                gelaatsverzorgingen.
              </SubSectionText>
              <SubSectionText>
                Met de Clarity II laser behandelen we pigmentvlekken, couperose,
                rosacea en ongewenste haargroei. Voor huidverstrakking en
                lichaamscontouring bieden we HIFU, LPG Endermologie en
                cryolipolyse.
              </SubSectionText>
              <SubSectionText>
                Ontdek ook onze esthetische behandelingen: powderbrows, lip
                blush, wimperextensions en wimperlifting.
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
                  width={700}
                  height={602}
                />
              </ImageWrapper>
              <SubSectionText>
                Ontdek ons zorgvuldig geselecteerde assortiment van ZO Skin
                Health, Environ, NeoStrata, Heliocare, Biretix, Advanced
                Nutrition Programme, Insentials, Jane Iredale en Essential
                Parfums.
              </SubSectionText>
              <SubSectionText>
                Van huidverbetering, anti-aging en acne tot
                voedingssupplementen, minerale make-up en exclusieve parfums.
              </SubSectionText>
              Bekijk een selectie van onze producten in de webshop. Ons
              volledige assortiment is verkrijgbaar in het instituut of te
              bestellen via info@anniek-lambrecht.be. Persoonlijk advies geven
              we je graag!
              <SubSectionText></SubSectionText>
              <strong>Nieuw bij ons?</strong> Ontvang eenmalig 15%
              welkomstkorting op je eerste online productaankoop!
              <SubSectionText></SubSectionText>
              <StyledLink>Ontdek alle producten</StyledLink>
            </SectionTwo>
          </Link>
        </SubSection>
      </Outer>
    </Layout>
  );
}
