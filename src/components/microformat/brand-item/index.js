import React from 'react';
import Link from 'next/link';
import ContentTransformer from 'ui/content-transformer';

import { screen, H3 } from 'ui';

import { Outer, Text, ImageWrapper, Img } from './styles';

export default function BrandItem({ data, gridCell }) {
  if (!data) {
    return null;
  }

  const { name, path } = data;
  const imageMdWidth = 100 / (gridCell?.layout?.colspan ?? 1);

  let image;

  const images = data.components?.find((c) => c.type === 'images');
  image = images?.content?.images?.[0];

  const paragraphs = data.components?.find((c) => c.name === 'Beschrijving');

  return (
    <Link href={path} passHref>
      <Outer>
        <Text>
          <H3>{name}</H3>
        </Text>
        <ImageWrapper>
          {image && (
            <Img
              {...image}
              alt={name}
              sizes={`(min-width ${screen.md}px) ${imageMdWidth}px, 100vw`}
            />
          )}
        </ImageWrapper>
        <Text>
          <ContentTransformer {...paragraphs?.content?.paragraphs?.[0]?.body.json} />
        </Text>
      </Outer>
    </Link>
  );
}