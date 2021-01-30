import React from 'react';

import { simplyFetchFromGraph } from 'lib/graph';
import { Outer, H1, H3 } from 'ui';
import Layout from 'components/layout';
import Breadcrumb from 'components/breadcrumb'
import ItemMicroformat from 'components/item-microformat';
import toText from '@crystallize/content-transformer/toText';
import { List, BrandHeader, Content, ImageWrapper, Img } from './styles';
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

export default function ProductLinePage({ productline, preview }) {
  const { children } = productline;
  const description = productline.components?.find((c) => c.name === 'Beschrijving')
    ?.content?.paragraphs?.[0]?.body.json;
  
  const images = productline.components?.find((c) => c.type === 'images')
  const image = images?.content?.images[0]

  const subtitle = productline.components?.find((c) => c.name === 'Subtitel');

  return (
    <Layout
      title={productline.name}
      description={toText(description)}
      preview={preview}
    >
      <Outer>
        <Breadcrumb path={productline.path} />
        <BrandHeader>
          <Content>
            <H1>{productline.name}</H1>
            {subtitle && <H3>{subtitle.content.text}</H3>}
            {description && <p>{toText(description)}</p>}
          </Content>
          <ImageWrapper>
            <Img src={image.url} width={image.width} height={image.height} alt={productline.name} />
          </ImageWrapper>
        </BrandHeader>
        {
          children && (
              <List>
                {children.map((item, i) => (
                  // change type from 'folder' to 'productline'
                  item.type = 'productline',
                  <ItemMicroformat item={item} key={i} />
                ))}
              </List>
            )
          }
      </Outer>
    </Layout>
  );
}
