import React from 'react';
import Link from 'next/link';

import { screen, H3 } from 'ui';
import TopicTag from 'components/topic-tag';

import { Outer, Text, MediaWrapper, Img, Tags, Inner } from './styles';

export default function DocumentItem({ data }) {
  if (!data) {
    return null;
  }

  const { name, path } = data;
  let image;
  const images = data.components?.find((c) => c.type === 'images');
  image = images?.content?.images?.[0];

  let media;

  if (image) {
    media = (
      <Img
        {...image}
        alt={name}
        sizes={`(min-width ${screen.md}px) 33vw, 100vw`}
      />
    );
  } else {
    media = null;
  }

  return (
    <Link href={path} passHref>
      <Outer>
        <Inner>
          {!!media && <MediaWrapper>{media}</MediaWrapper>}
          <Text>
            <Tags>
              {data?.topics?.map((topic) => (
                <TopicTag
                  {...topic}
                  key={`listing-${topic.id}-${data?.id}`}
                  underline
                />
              ))}
            </Tags>
            <H3>{name}</H3>
          </Text>
        </Inner>
      </Outer>
    </Link>
  );
}
