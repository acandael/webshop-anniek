import React from 'react';

import { simplyFetchFromGraph } from 'lib/graph';
import { Outer, H1 } from 'ui';
import Layout from 'components/layout';
import toText from '@crystallize/content-transformer/toText';
import query from './query';
import {
  BehandelingHeader,
  Button,
  HeroSection,
  HeroText,
  HeroImages,
  HeroImage,
  PriceList,
  Policy
} from './styles';
import BehandelingComponents from 'components/shape/behandeling-components';
import Breadcrumb from 'components/breadcrumb';
import PropertiesTable from 'components/shape/behandeling-components/properties-table';
import Link from 'next/link';

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
  const rest = folder.components?.filter(
    (c) =>
      c.type !== 'gridRelations' &&
      c.name !== 'Samenvatting' &&
      c.type !== 'propertiesTable'
  );

  const icon = folder.components?.find((c) => c.name === 'Icon');
  const description = folder.components?.find((c) => c.name === 'Beschrijving')
    ?.content?.paragraphs[0].body.json;

  const allImages = folder.components?.find((c) => c.type === 'images')?.content
    ?.images;

  const prijslijsten = folder.components?.find(
    (c) => c.type === 'propertiesTable'
  )?.content;

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
            <Link
              href="https://schoonheidsinstituut-anniek-lambrecht-1.salonized.com/bookings/new?"
              passHref
            >
              <Button width="221px">Boek Nu</Button>
            </Link>
            <BehandelingComponents components={rest} />
          </HeroText>
          {allImages?.length > 0 && (
            <HeroImages count={allImages.length}>
              {allImages.map((image, index) => (
                <HeroImage
                  key={image.url}
                  src={image.url}
                  width={618}
                  height={550}
                  alt={image.altText || `${folder.name} ${index + 1}`}
                  style={{ width: '100%' }}
                />
              ))}
            </HeroImages>
          )}
        </HeroSection>
        <PriceList>
          <PropertiesTable {...prijslijsten} />
        </PriceList>
        <Policy>
          <p>
            <strong>Annulatie policy</strong>: U kan uw afspraak kosteloos
            verplaatsen of annuleren tot 72u vooraf. Dit kan 24u/24u via de link
            in de bevestigingsmail van de afspraak of via onze e-mail:
            info@anniek-lambrecht.be (zondag uitgesloten) Indien u niet tijdig
            annuleert, zijn wij genoodzaakt 50% van het bedrag van de gemaakte
            afspraak aan te rekenen ​voor personeels- en werkingskosten, tenzij
            u een doktersattest kan voorleggen. Andere redenen aanvaarden wij
            niet. Deze factuur zullen wij mailen en kan u overschrijven. Dank
            voor het begrip!
          </p>
        </Policy>
      </Outer>
    </Layout>
  );
}
