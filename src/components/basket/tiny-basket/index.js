import React from 'react';

import { useT } from 'lib/i18n';

import { useBasket } from '../index';
import TinyBasketItem from './item';

import { Outer, Items, ItemOuter, BasketIsEmpty, ShippingForm } from './styles';
import {H4} from 'ui';

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
    // shipping can only be added once
    const shipping = basket.cart.find((product) => product.name === 'verzenden');
    if (!shipping) {
      basket.actions.addItem({
        sku: 'shipping-1615829277481',
        path: '/shipping/verzenden',
        quantity: 1,
        priceVariantIdentifier: 'default'
      })
    }
    basket.actions.setCanCheckout(true)
  }

  function addPickup() {
    const shipping = basket.cart.find((product) => product.name === 'verzenden');
    if (shipping) {
      basket.actions.removeItem(shipping)
    }
    basket.actions.setCanCheckout(true)
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
        <H4>Kies een verzendmethode</H4>
        <input type="radio" id="ship" name="verzenden" value="ship" onClick={addShipping} />
        <label htmlFor="ship">Verzenden (8 Euro)</label><br></br>
        <input type="radio" id="pickup" name="verzenden" value="pickup" onClick={addPickup} />
        <label htmlFor="pickup">Ophalen (Gratis)</label><br></br>
      </ShippingForm>
    </Outer>
  );
}