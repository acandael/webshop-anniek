import React from 'react';

import { simplyFetchFromGraph } from 'lib/graph';
import { Outer, Header, H1, Message } from 'ui';
import Layout from 'components/layout';
import ItemMicroformat from 'components/microformat';
import { List, PromotionWrapper } from './styles';
import query from './query';
import Stackable from 'components/stackable';

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

export default function WebshopPage({ folder, preview }) {
  const { children } = folder;
  const description = folder.components?.find((c) => c.name === 'Beschrijving')
    ?.content?.text;
  const icon = folder.components?.find((c) => c.name === 'Icon');
  const stacks = folder.components?.find((c) => c.name === 'Stackable content')
    ?.content?.items;

  return (
    <Layout
      title={folder.name}
      description={description}
      image={icon?.content?.images?.[0]?.url}
      preview={preview}
    >
      <Outer>
        <Message>
          Op woensdag 16 juni uitzonderlijk gesloten! Wacht steeds met het
          afhalen van je bestelling tot je een mail ontvangen hebt dat je
          bestelling klaar is voor afhalen. Op vrijdag 25 juni vanaf 14h
          gesloten. Verlof van 30 juni tem 7 juli. Alle bestellingen in deze
          periode zullen ten vroegste vanaf 8 juli kunnen afgehaald worden nadat
          je de mail met klaar voor afhalen ontvangen hebt.
        </Message>
        <Header centerContent>
          <H1>{folder.name}</H1>
        </Header>
        <PromotionWrapper>
          <Stackable stacks={stacks} />
        </PromotionWrapper>
        {children && (
          <List>
            {children.map(
              (item, i) => (
                // change type from 'folder' to 'folder'
                (item.type = 'webshop'),
                (<ItemMicroformat item={item} key={i} />)
              )
            )}
          </List>
        )}
      </Outer>
    </Layout>
  );
}
