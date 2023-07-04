import React from 'react';
import Link from 'next/link';

import { screen, H3 } from 'ui';

import {
  Outer,
  Text,
  ImageWrapper,
  Img,
  Price,
  BeforePrice,
  Percentage
} from './styles';

import { useLocale } from 'lib/app-config';
import { useT } from 'lib/i18n';

import getRelativePriceVariants from 'lib/pricing';

export default function KadobonItem({ data }) {
  const t = useT();
  const locale = useLocale();

  if (!data) {
    return null;
  }

  const { name, path, variants, matchingVariant } = data;

  const variant =
    matchingVariant || variants?.find((variant) => variant.isDefault) || {};

  const imageMdWidth = 100 / 1;

  let image;

  const images = data.components?.find((c) => c.type === 'images');
  image = images?.content?.images?.[0];

  const titel = data.components?.find((c) => c.name === 'Titel');

  const pricing = getRelativePriceVariants({
    variant: variant,
    locale
  });

  return (
    <Link href={path} passHref>
      <Outer>
        <Text>
          <H3>{titel.content?.text}</H3>
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
          {pricing?.discountPrice ? (
            <Price discounted>
              <strong>
                {t('common.price', {
                  value: pricing?.discountPrice?.price,
                  currency: pricing?.discountPrice?.currency
                })}
              </strong>
              <BeforePrice>
                {t('common.price', {
                  value: pricing?.defaultPrice?.price,
                  currency: pricing?.defaultPrice?.currency
                })}
              </BeforePrice>
            </Price>
          ) : (
            <Price>
              <strong>
                {t('common.price', {
                  value: pricing?.defaultPrice?.price,
                  currency: pricing?.defaultPrice?.currency
                })}
              </strong>
            </Price>
          )}
          {!!pricing?.discountPercentage && (
            <Percentage>{`-${pricing?.discountPercentage}%`}</Percentage>
          )}
        </Text>
      </Outer>
    </Link>
  );
}
