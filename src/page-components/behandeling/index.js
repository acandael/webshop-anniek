import React from 'react';

import { simplyFetchFromGraph } from 'lib/graph';
import { Outer, H1 } from 'ui';
import Layout from 'components/layout';
import toText from '@crystallize/content-transformer/toText';
import query from './query';
import {BehandelingHeader, H3, HeroSection, HeroText, HeroImage, Img, PriceList} from './styles'
import BehandelingComponents from 'components/shape/behandeling-components';
import Breadcrumb from 'components/breadcrumb';
import PropertiesTable from 'components/shape/behandeling-components/properties-table';

export async function getData({ asPath, language, preview = null }) {
  const { data } = await simplyFetchFromGraph({
    query,
    variables: {
      path: asPath,
      language,
      version: preview ? 'draft' : 'published'
    }
  });

  return { ...data, preview };
}

export default function BehandelingPage({ folder, preview }) {
  const rest = folder.components?.filter((c) => c.type !== 'gridRelations' && c.name !== 'Samenvatting' && c.type !== 'propertiesTable');

  const icon = folder.components?.find((c) => c.name === 'Icon');
  const description = folder.components?.find((c) => c.name === 'Beschrijving')?.content?.paragraphs[0].body.json;
    
  const images = folder.components?.find((c) => c.type === 'images')
  const image = images?.content?.images[0]

  const prijslijsten = folder.components?.find((c) => c.type === 'propertiesTable').content



  return (
    <Layout
      title={folder.name}
      description={toText(description).substring(0, 120)}
      image={icon?.content?.images?.[0]?.url}
      preview={preview}
    >
      <Outer>
        <Breadcrumb path={folder.path} />
        <BehandelingHeader centerContent>
          <H1>{folder.name}</H1>
        </BehandelingHeader>
        <HeroSection>
          <HeroText>
            <BehandelingComponents components={rest} />
          </HeroText>
          <HeroImage>
            <Img src={image.url} width={image.width} height={image.height} alt={folder.name} />
          </HeroImage>
        </HeroSection>
        <PriceList>
          <PropertiesTable {...prijslijsten} />
        </PriceList>
      </Outer>
    </Layout>
  );
}
