import React from 'react';

import { simplyFetchFromGraph } from 'lib/graph';
import { Outer, Header, H1 } from 'ui';
import Layout from 'components/layout';
import ItemMicroformat from 'components/microformat';
import { List, PromotionWrapper } from './styles';
import query from './query';
import Stackable from 'components/stackable';
import { Message } from 'ui';

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
          <p>
            Verlof van 25 februari tot 7 maart. Bestellingen kunnen pas na 7
            maart afgehaald of verstuurd worden.{' '}
          </p>
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
