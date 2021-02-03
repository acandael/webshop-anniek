import React from 'react';

import { simplyFetchFromGraph } from 'lib/graph';
import { Outer, H1 } from 'ui';
import Layout from 'components/layout';
import Breadcrumb from 'components/breadcrumb'
import ItemMicroformat from 'components/item-microformat';
import toText from '@crystallize/content-transformer/toText';
import { List, BrandHeader, Content, ImageWrapper, Img, Logo } from './styles';
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

export default function BrandPage({ folder, preview }) {
  const { children } = folder;
  
  const description = folder.components?.find((c) => c.name === 'Beschrijving')
    ?.content?.paragraphs[0].body.json;
  
  const images = folder.components?.find((c) => c.type === 'images')
  const image = images?.content?.images[0]
  
  const logo = folder.components?.find((c) => c.name === 'Logo').content?.images?.[0]

  return (
    <Layout
      title={folder.name}
      description={toText(description)}
      preview={preview}
    >
      <Outer>
        <Breadcrumb path={folder.path} />
        <BrandHeader>
          <Content>
            <H1>{folder.name}</H1>
            <ImageWrapper>
            {logo && <Logo src={logo.url} width={logo.width} height={logo.height} alt={folder.name} logo />}
          </ImageWrapper>
            <p>{toText(description)}</p>
          </Content>
          <ImageWrapper>
            <Img src={image.url} width={image.width} height={image.height} alt={folder.name} />
          </ImageWrapper>
        </BrandHeader>
        {
          children && (
              <List>
                {children.map((item, i) => (
                  // change type from 'folder' to 'brand'
                  item.type = 'brand',
                  <ItemMicroformat item={item} key={i} />
                ))}
              </List>
            )
          }
      </Outer>
    </Layout>
  );
}
