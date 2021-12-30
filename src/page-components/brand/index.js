import React from 'react';
import Link from 'next/link';
import { simplyFetchFromGraph } from 'lib/graph';
import { Outer, H1 } from 'ui';
import Layout from 'components/layout';
import Breadcrumb from 'components/breadcrumb';
import Microformat from 'components/microformat';
import toText from '@crystallize/content-transformer/toText';
import {
  List,
  BrandHeader,
  Content,
  ImageWrapper,
  Img,
  StyledLink
} from './styles';
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
  const { children, components } = folder;
  const description = components?.find((c) => c.name === 'Beschrijving')
    ?.content?.paragraphs[0].body.json;

  const images = components?.find((c) => c.type === 'images');
  const image = images?.content?.images[0];

  const moreinfo = components?.find((c) => c.name === 'Meerinfo')?.content
    ?.text;
  const brochure = components?.find((c) => c.name === 'Brochure')?.content
    ?.text;

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
            <p>{toText(description)}</p>
            {moreinfo && (
              <Link href={moreinfo}>
                <StyledLink>Meer info</StyledLink>
              </Link>
            )}
            {brochure && (
              <Link href={brochure}>
                <StyledLink>Brochure</StyledLink>
              </Link>
            )}
          </Content>
          <ImageWrapper>
            <Img
              src={image.url}
              width={image.width}
              height={image.height}
              alt={folder.name}
            />
          </ImageWrapper>
        </BrandHeader>
        {children && (
          <List>
            {children?.map(
              (item, i) => (
                (item.type = 'brand'), (<Microformat item={item} key={i} />)
              )
            )}
          </List>
        )}
      </Outer>
    </Layout>
  );
}
