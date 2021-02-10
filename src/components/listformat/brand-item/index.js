import React from 'react';
import Link from 'next/link';
import { H3 } from 'ui';
import { Outer, Text, ImageWrapper, Img } from './styles';

export default function BrandItem({ data }) {
  if (!data) {
    return null;
  }
  const { name, path } = data;
  const images = data.components?.find((c) => c.type === 'images');
  const image = images?.content?.images?.[0];

  return (
    <Link href={path} passHref>
      <Outer>
        <Text>
          <H3>Brand</H3>
        </Text>
        <ImageWrapper>
            {image && <Img {...image} alt={name} sizes="250px" />}
          </ImageWrapper>
      </Outer>
    </Link>
  );
}