import React from 'react';

import { simplyFetchFromGraph } from 'lib/graph';
import { Outer, Header, H1 } from 'ui';
import Layout from 'components/layout';
import ItemMicroformat from 'components/microformat';
import { List } from './styles';
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

export default function BehandelingenPage({ folder, preview }) {
  const { children } = folder;
  
  const description = folder.components?.find((c) => c.name === 'Beschrijving')
    ?.content?.text;
  const icon = folder.components?.find((c) => c.name === 'Icon');


  return (
    <Layout
      title={folder.name}
      description={description}
      image={icon?.content?.images?.[0]?.url}
      preview={preview}
    >
      <Outer>
        <Header centerContent>
          <H1>{folder.name}</H1>
        </Header>
        {children && (
              <List>
                {children.map((item, i) => (
                  // change type from 'folder' to 'behandelingen'
                  item.type = 'behandelingen',
                  <ItemMicroformat item={item} key={i} />
                ))}
              </List>
            )}
      </Outer>
    </Layout>
  );
}
