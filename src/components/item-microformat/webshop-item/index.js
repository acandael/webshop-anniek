import React from 'react';
import Link from 'next/link';

import { screen, H3 } from 'ui';

import { Outer, Text, ImageWrapper, Img } from './styles';

export default function WebshopItem({ data, gridCell }) {
  if (!data) {
    return null;
  }

  const { name, path } = data;
  const imageMdWidth = 100 / (gridCell?.layout?.colspan ?? 1);

  let image;

  const images = data.components?.find((c) => c.type === 'images');
  image = images?.content?.images?.[0];

  let description;
  const paragraphs = data.components?.find((c) => c.name === 'Beschrijving');
  description = paragraphs?.content?.paragraphs?.[0].body.json[0].children[0].textContent;

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
          <p>{description}</p>
        </Text>
        
      </Outer>
    </Link>
  );
}
