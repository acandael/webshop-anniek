import React from 'react';

import Layout from 'components/layout';
import { simplyFetchFromGraph } from 'lib/graph';
import fragments from 'lib/graph/fragments';
import { useT } from 'lib/i18n';
import { Button } from 'ui';
import { Outer, Header, H1, H2, HeroSection, HeroText, HeroImage, CTAButton, CTAText, SubSection, SectionOne, SectionTwo, SubSectionText, SubSectionImage, StyledLink } from './styles';
import Image from 'next/image';
import Link from 'next/link'


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
        <Header>
          <H1>skincoach anniek lambrecht</H1>
        </Header>
        <HeroSection>
          <HeroText>
          <p>Mijn zaak is geen klassiek schoonheidsinstituut 
          maar een cosmedisch instituut waar de focus 
          op huidverbetering en gelaatsverzorging ligt.</p>
          <p>We starten met een kennismaking en we maken een 
          huidfoto in 3D. Hierdoor is een perfecte huidanalyse 
          mogelijk en kan ik jou de gepaste behandeling voorstellen.</p>
          <Button
          width="221px"
          >
          Boek Nu
          </Button>
          </HeroText>
          <HeroImage>
            <Image src="/static/hero-image.jpg" alt="anniek lambrecht" width={400} height={400} />
          </HeroImage>
        </HeroSection>
        <SubSection>
          <Link href="/behandelingen" passHref>
            <SectionOne>
              <H2>BEHANDELINGEN</H2>
              <SubSectionImage src="/static/subsection-behandelingen.jpg" alt="anniek lambrecht - behandelingen" />
              <SubSectionText>Ik heb een uitgebreid aanbod met verschillende huidverzorgingen, ook als je weinig tijd hebt kan je een korte behandeling kiezen om met een minimum aan tijd een maximum resultaat te halen.</SubSectionText>
              <Link href="/behandelingen"><StyledLink>Ontdek alle behandelingen</StyledLink></Link>
            </SectionOne>
          </Link>
          <Link href="/webshop" passHref>
          <SectionTwo>
            <H2>WEBSHOP</H2>
            <SubSectionImage src="/static/subsection-webshop.jpg" alt="anniek lambrecht - webshop" />
            <SubSectionText>
              Ik werk met de huidproducten van Advanced nutricion programme en Environ.
Met de minerale make-up producten van Jane Iredale maak ik van jou een echte beauty
            </SubSectionText>
            <Link href="/webshop"><StyledLink>Ontdek alle producten</StyledLink></Link>
          </SectionTwo>
          </Link>
        </SubSection>
      </Outer>
    </Layout>

  );
}