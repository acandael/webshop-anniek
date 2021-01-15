import React from 'react';

import Layout from 'components/layout';
import Grid, { GridItem } from 'components/grid';
import { simplyFetchFromGraph } from 'lib/graph';
import fragments from 'lib/graph/fragments';
import { useT } from 'lib/i18n';

import { Outer, Header, H1, HeroSection, HeroText, HeroImage } from './styles';
import Image from 'next/image';


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
          </HeroText>
          <HeroImage>
            <Image src="/static/hero-image.jpg" alt="anniek lambrecht" width={400} height={400} />
          </HeroImage>
        </HeroSection>
      </Outer>
    </Layout>

  );
}