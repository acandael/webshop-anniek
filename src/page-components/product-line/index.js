import React from 'react';

import { simplyFetchFromGraph } from 'lib/graph';
import Layout from 'components/layout';
import Breadcrumb from 'components/breadcrumb';
import ItemMicroformat from 'components/microformat';
import toText from '@crystallize/content-transformer/toText';
import { List, Outer, H1 } from './styles';
import query from './query';

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

export default function ProductLinePage({ folder, preview }) {
  const { children } = folder;
  const description = folder.components?.find((c) => c.name === 'Beschrijving')
    ?.content?.paragraphs?.[0]?.body?.json;

  //const images = folder.components?.find((c) => c.type === 'images');
  //const image = images?.content?.images[0];

  //const subtitle = folder.components?.find((c) => c.name === 'Subtitel');

  return (
    <Layout
      title={folder.name}
      description={toText(description)}
      preview={preview}
    >
      <Outer>
        <Breadcrumb path={folder.path} />
        <H1>{folder.name}</H1>

        {children && (
          <List>
            {children.map(
              (item, i) => (
                // change type from 'folder' to 'productline'
                (item.type = 'productline'),
                (<ItemMicroformat item={item} key={i} />)
              )
            )}
          </List>
        )}
      </Outer>
    </Layout>
  );
}
