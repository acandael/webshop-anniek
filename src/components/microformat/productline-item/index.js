import React from 'react';
import Link from 'next/link';
import { useT } from 'lib/i18n';
import { screen, H3 } from 'ui';
import { useLocale } from 'lib/app-config';
import { Outer, Text, ImageWrapper, Img, Price, BeforePrice } from './styles';

import getRelativePriceVariants from 'lib/pricing';

export default function FolderItem({ data, gridCell }) {
  const t = useT();
  const locale = useLocale();
  if (!data) {
    return null;
  }

  const { name, path, variants, matchingVariant } = data;
  const imageMdWidth = 100 / (gridCell?.layout?.colspan ?? 1);

  let image;

  const images = data.components?.find((c) => c.type === 'images');
  image = images?.content?.images?.[0];
  const samenvatting = data.components?.find((c) => c.name === 'Samenvatting');

  const variant =
    matchingVariant || variants?.find((variant) => variant.isDefault) || {};

  const pricing = getRelativePriceVariants({
    variant: variant,
    locale
  });

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
          <p>{samenvatting && samenvatting.content?.text}</p>
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
                {pricing?.defaultPrice.price &&
                  t('common.price', {
                    value: pricing?.defaultPrice?.price,
                    currency: pricing?.defaultPrice?.currency
                  })}
              </strong>
            </Price>
          )}
        </Text>
      </Outer>
    </Link>
  );
}
