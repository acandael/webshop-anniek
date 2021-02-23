import React from 'react';

import { simplyFetchFromGraph } from 'lib/graph';
import { Outer, Header, H1 } from 'ui';
import Layout from 'components/layout';
import ItemMicroformat from 'components/microformat';
import toText from '@crystallize/content-transformer/toText';
import { List, ImageWrapper, Img } from './styles';
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

  console.log(stacks)
  return (
    <Layout
      title={folder.name}
      description={toText(description)}
      image={icon?.content?.images?.[0]?.url}
      preview={preview}
    >
      <Outer>
        <Header centerContent>
          <H1>{folder.name}</H1>
        </Header>
        <ImageWrapper>
          <Stackable stacks={stacks} />
        </ImageWrapper>
        { children && (
              <List>
                {children.map((item, i) => (
                  // change type from 'folder' to 'folder'
                  item.type = 'webshop',
                  <ItemMicroformat item={item} key={i} />
                ))}
              </List>
            )}
      </Outer>
    </Layout>
  );
}
