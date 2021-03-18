import React from 'react';

import { useT } from 'lib/i18n';

import { useBasket } from '../index';
import TinyBasketItem from './item';

import { Outer, Items, ItemOuter, BasketIsEmpty, ShippingForm } from './styles';

export default function TinyBasket() {
  const t = useT();
  const { status, cart } = useBasket();

  if (status === 'not-hydrated') {
    return null;
  }

  if (!cart?.length) {
    return (
      <Outer>
        <BasketIsEmpty>{t('basket.empty')}</BasketIsEmpty>
      </Outer>
    );
  }

  const basket = useBasket()

  function addShipping() {
    basket.actions.addItem({
      sku: 'shipping-1615829277481',
      path: '/shipping/verzenden',
      quantity: 1,
      priceVariantIdentifier: 'default'
    })
  }

  return (
    <Outer>
      <Items>
        {cart.map((item) => (
          <ItemOuter key={item.sku} item={item}>
            <TinyBasketItem item={item} />
          </ItemOuter>
        ))}
      </Items>
      <ShippingForm>
        <input type="radio" id="ship" name="verzenden" value="ship" onClick={addShipping} />
        <label htmlFor="ship">Verzenden (8 Euro)</label><br></br>
        <input type="radio" id="pickup" name="verzenden" value="pickup" />
        <label htmlFor="pickup">Ophalen (Gratis)</label><br></br>
      </ShippingForm>
    </Outer>
  );
}