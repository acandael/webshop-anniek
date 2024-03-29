import React from 'react';

import { useBasket } from 'components/basket';
import Layout from 'components/layout';
import OrderItems from 'components/order-items';
import Totals from 'components/basket/totals';
import { useT } from 'lib/i18n';

import Payment from './payment';
import {
  Outer,
  Inner,
  SectionHeader,
  Container,
  CheckoutFormGroup
} from './styles';

function Checkout({ redirect_status = null }) {
  const basket = useBasket();
  const t = useT();

  if (redirect_status === 'failed') {
    return (
      <Outer>
        <Container>
          <p>Er was een probleem met de betaling</p>
        </Container>
      </Outer>
    );
  }

  if (basket.status !== 'ready') {
    return <Outer center>{t('basket.loading')}</Outer>;
  }

  const { cart } = basket;

  if (!cart?.length) {
    return <Outer center>{t('basket.empty', { context: 'inCheckout' })}</Outer>;
  }

  return (
    <Outer>
      <Inner>
        <Container>
          <Payment />
        </Container>
        <Container>
          <CheckoutFormGroup>
            <SectionHeader>{t('basket.title')}</SectionHeader>
            <OrderItems cart={cart} />
            <div style={{ padding: '0 15px' }}>
              <Totals />
            </div>
          </CheckoutFormGroup>
        </Container>
      </Inner>
    </Outer>
  );
}

export default function CheckoutWithLayout(props) {
  const t = useT();

  return (
    <Layout title={t('checkout.title')} simple>
      <Checkout {...props} />
    </Layout>
  );
}
