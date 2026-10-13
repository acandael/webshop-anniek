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
            Om iedere klant de nodige tijd en aandacht te kunnen bieden,
            reserveren wij jouw afspraak met de grootste zorg.
          </p>
          <p>
            Je kunt jouw afspraak kosteloos annuleren of verplaatsen tot 72 uur
            vooraf. Dit kan 24/24 uur via de link in je bevestigingsmail of per
            e-mail naar{' '}
            <a href="mailto:info@anniek-lambrecht.be">
              info@anniek-lambrecht.be
            </a>
            .
          </p>
          <p>
            Bij een laattijdige annulatie of het niet nakomen van je afspraak
            zijn wij genoodzaakt 50% van het bedrag van de gereserveerde
            behandeling aan te rekenen ter compensatie van personeels- en
            werkingskosten.
          </p>
          <p>
            Een uitzondering is uitsluitend mogelijk op vertoon van een geldig
            doktersattest. Andere redenen geven geen recht op vrijstelling van
            de annuleringskosten.
          </p>
          <p>
            De eventuele factuur ontvang je per e-mail en kan via overschrijving
            worden betaald.
          </p>
          <p>
            Bedankt voor je begrip en respect voor onze gereserveerde
            behandeltijd.
          </p>
        </Policy>
      </Outer>
    </Layout>
  );
}
