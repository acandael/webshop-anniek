import React from 'react';

import { simplyFetchFromGraph } from 'lib/graph';
import { Outer, Header, H1, Message } from 'ui';
import Layout from 'components/layout';
import ItemMicroformat from 'components/microformat';
import toText from '@crystallize/content-transformer/toText';
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
    ?.content?.json;
  const icon = folder.components?.find((c) => c.name === 'Icon');
  const stacks = folder.components?.find((c) => c.name === 'Stackable content')
    ?.content?.items;

  return (
    <Layout
      title={folder.name}
      description={toText(description)}
      image={icon?.content?.images?.[0]?.url}
      preview={preview}
    >
      <Outer>
        <Message>
          Bestellingen kunnen enkel afgehaald worden na ontvangst van je email
          dat de bestelling klaar staat voor afhaling. Vanwege de corona
          maatregelen is er een afhaalmoment op maandag 19 en vrijdag 23 april
          van 9-12h, tenzij anders afgesproken.
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
