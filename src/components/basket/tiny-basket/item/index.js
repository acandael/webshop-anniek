import React, { useEffect, useState } from 'react';

import { useBasket } from 'components/basket';
import AttributeList from 'components/attribute-list';
import { useT } from 'lib/i18n';

import {
  Item,
  Row,
  ItemInfo,
  PriceWrapper,
  ImageImageEmpty,
  ItemImage,
  ItemName,
  ItemQuantityChanger,
  ItemQuantity,
  ItemDelete,
  PriceWrap,
  Price,
  drawAttentionDuration
} from './styles';

export default function TinyBasketItem({ item }) {
  const t = useT();
  const { attentionCartItem, actions } = useBasket();
  const [drawAttention, setDrawAttention] = useState(false);

  const { attributes, images } = item;

  // Draw users attention when the item is added to the basket
  useEffect(() => {
    if (attentionCartItem.sku === item.sku) {
      setDrawAttention(true);

      let timeout = setTimeout(
        () => setDrawAttention(false),
        drawAttentionDuration
      );

      return () => clearTimeout(timeout);
    }
  }, [attentionCartItem.sku, item.sku]);

  function increment() {
    actions.incrementItem(item);
  }

  function decrement() {
    actions.decrementItem(item);
  }

  function remove() {
    // if shipping product is removed the user should not be able to checkout
    if (item.name === 'verzenden') {
      actions.setCanCheckout(false);
    }
    actions.removeItem(item);
  }

  if (item.sku.startsWith('shipping')) {
    return (
      <Item>
        <ImageImageEmpty>{item.name}</ImageImageEmpty>
        <PriceWrapper>
          <PriceWrap>
            <Price>
              {t('common.price', {
                value: item.price.gross,
                currency: item.price.currency
              })}
            </Price>
          </PriceWrap>
        </PriceWrapper>
        <ItemDelete onClick={remove}>{t('basket.removeItem', item)}</ItemDelete>
      </Item>
    );
  }

  if (item.sku.startsWith('--voucher--')) {
    return (
      <Item>
        <ImageImageEmpty>{item.name}</ImageImageEmpty>
        <PriceWrapper>
          <PriceWrap>
            <Price>
              {t('common.price', {
                value: item.price.gross,
                currency: item.price.currency
              })}
            </Price>
          </PriceWrap>
        </PriceWrapper>
        <ItemDelete onClick={actions.removeVoucherCode}>
          {t('basket.removeItem', item)}
        </ItemDelete>
      </Item>
    );
  }

  return (
    <Item animate={drawAttention}>
      <ItemImage {...images?.[0]} />
      <ItemInfo>
        <Row>
          <ItemName>{item.name}</ItemName>
          {attributes?.length > 0 && <AttributeList attributes={attributes} />}
        </Row>

        <PriceWrapper>
          <PriceWrap>
            <Price>
              {t('common.price', {
                value: item.price.gross,
                currency: item.price.currency
              })}
            </Price>
          </PriceWrap>
        </PriceWrapper>
      </ItemInfo>
      <div>
        <ItemQuantityChanger>
          <button
            onClick={decrement}
            type="button"
            disabled={item.quantity === 1}
          >
            -
          </button>
          <ItemQuantity>{item.quantity}</ItemQuantity>
          <button onClick={increment} type="button">
            +
          </button>
        </ItemQuantityChanger>
      </div>
      <ItemDelete onClick={remove}>{t('basket.removeItem', item)}</ItemDelete>
    </Item>
  );
}
