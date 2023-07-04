import React from 'react';
import Link from 'next/link';

import { screen } from 'ui';
import ContentTransformer from 'ui/content-transformer';

import { Outer, Text, MediaWrapper, Img, Title, Description } from './styles';

export default function DocumentItem({ data, colSpan = '4' }) {
  if (!data) {
    return null;
  }

  const { name, path } = data;
  const images = data.components?.find((c) => c.type === 'images');
  const image = images?.content?.images?.[0];
  const description = data.components?.find((c) => c.name === 'Intro');

  let media = null;

  if (image) {
    media = (
      <Img
        {...image}
        alt={name}
        sizes={`(min-width ${screen.md}px) 33vw, 100vw`}
      />
    );
  }

  return (
    <Link href={path} passHref>
      <Outer span={colSpan}>
        {Boolean(media) && <MediaWrapper>{media}</MediaWrapper>}
        <Text>
          <Title>{name}</Title>
          <Description>
            <ContentTransformer {...description?.content?.json} />
          </Description>
        </Text>
      </Outer>
    </Link>
  );
}
