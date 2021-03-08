/* eslint-disable react/display-name */
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

import styled from 'styled-components';
import { useQuery } from 'react-query';

import ServiceApi from 'lib/service-api';
import { useT } from 'lib/i18n';
import { useBasket } from 'components/basket';
import { Spinner } from 'ui/spinner';
import {useForm} from 'react-hook-form';

import {
  Input,
  InputGroup,
  ErrorMessage,
  Label,
  PaymentSelector,
  PaymentProviders,
  PaymentButton,
  PaymentProvider,
  SectionHeader,
  CheckoutFormGroup
} from '../styles';
import Voucher from '../voucher';

const StripeCheckout = dynamic(() => import('./stripe'));
const KlarnaCheckout = dynamic(() => import('./klarna'));
const VippsCheckout = dynamic(() => import('./vipps'));
const MollieCheckout = dynamic(() => import('./mollie'));

const Row = styled.div`
  display: flex;
  margin-bottom: 10px;
`;

const Inner = styled.div``;

export default function Payment() {
  const t = useT();
  const router = useRouter();
  const { basketModel, actions } = useBasket();
  const [selectedPaymentProvider, setSelectedPaymentProvider] = useState(null);
  const [state, setState] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    streetNumber: '',
    postalcode: '',
    city: '',
    shipping: false,
    pickup: false
  });

  const paymentConfig = useQuery('paymentConfig', () =>
    ServiceApi({
      query: `
      {
        paymentProviders {
          stripe {
            enabled
          }
          klarna {
            enabled
          }
          mollie {
            enabled
          }
          vipps {
            enabled
          }
        }
      }
    `
    })
  );

  // Handle locale with sub-path routing
  let multilingualUrlPrefix = '';
  if (window.location.pathname.startsWith(`/${router.locale}/`)) {
    multilingualUrlPrefix = '/' + router.locale;
  }

  const { firstName, lastName, email, street, streetNumber, postalCode, city, shipping, pickup } = state;

  function getURL(path) {
    return `${location.protocol}//${location.host}${multilingualUrlPrefix}${path}`;
  }

  /**
   * The checkout model shared between all the payment providers
   * It contains everything needed to make a purchase and complete
   * an order
   */

  const { register, errors } = useForm({mode: "onBlur"});


  const checkoutModel = {
    basketModel,
    customer: {
      firstName,
      lastName,
      addresses: [
        {
          type: 'billing',
          email: email || null
        },
        {
          type: 'delivery',
          street,
          streetNumber,
          postalCode,
          city
        }
      ]
    },
    confirmationURL: getURL(`/confirmation/{crystallizeOrderId}?emptyBasket`),
    checkoutURL: getURL(`/checkout`),
    termsURL: getURL(`/terms`)
  };

  const paymentProviders = [
    {
      name: 'stripe',
      color: '#FFF',
      logo: '/static/visa-mastercard.png',
      render: () => (
        <PaymentProvider>
          <StripeCheckout
            checkoutModel={checkoutModel}
            onSuccess={(crystallizeOrderId) => {
              router.push(
                checkoutModel.confirmationURL.replace(
                  '{crystallizeOrderId}',
                  crystallizeOrderId
                )
              );
              scrollTo(0, 0);
            }}
          />
        </PaymentProvider>
      )
    },
    {
      name: 'klarna',
      color: '#F8AEC2',
      logo: '/static/klarna-logo.png',
      render: () => (
        <PaymentProvider>
          <KlarnaCheckout
            checkoutModel={checkoutModel}
            basketActions={actions}
            getURL={getURL}
          />
        </PaymentProvider>
      )
    },
    {
      name: 'vipps',
      color: '#fff',
      logo: '/static/vipps-logo.png',
      render: () => (
        <PaymentProvider>
          <VippsCheckout
            checkoutModel={checkoutModel}
            basketActions={actions}
            onSuccess={(url) => {
              if (url) window.location = url;
            }}
          />
        </PaymentProvider>
      )
    },
    {
      name: 'mollie',
      color: '#fff',
      logo: '/static/mollie-vector-logo.png',
      render: () => (
        <PaymentProvider>
          <MollieCheckout
            checkoutModel={checkoutModel}
            basketActions={actions}
            onSuccess={(url) => {
              if (url) window.location = url;
            }}
          />
        </PaymentProvider>
      )
    }
  ];

  const enabledPaymentProviders = [];
  if (!paymentConfig.loading && paymentConfig.data) {
    const { paymentProviders } = paymentConfig.data.data;
    if (paymentProviders.klarna.enabled) {
      enabledPaymentProviders.push('klarna');
    }
    if (paymentProviders.mollie.enabled) {
      enabledPaymentProviders.push('mollie');
    }
    if (paymentProviders.vipps.enabled) {
      enabledPaymentProviders.push('vipps');
    }
    if (paymentProviders.stripe.enabled) {
      enabledPaymentProviders.push('stripe');
    }
  }

  const isValid = () => {
    if (firstName === "") {
      return false;
    }

    if (lastName === "") {
      return false;
    }

    if (email === "") {
      return false;
    }

    if (shipping) {
      if (street === "") {
        return false;
      }
      if (streetNumber === "") {
        return false;
      }
      if (postalCode === "") {
        return false;
      }
      if (city === "") {
        return false;
      }
    }

    return true;
  }

  return (
    <Inner>
      <CheckoutFormGroup>
        <SectionHeader>{t('checkout.title')}</SectionHeader>
        <form noValidate>
          <Row>
            <InputGroup>
              <Label htmlFor="firstname">{t('customer.firstName')}</Label>
              <Input
                name="firstname"
                ref={register({required: "Voornaam is verplicht"})}
                type="text"
                value={firstName}
                onChange={(e) =>
                  setState({ ...state, firstName: e.target.value })
                }
              />
              {errors.firstname && <ErrorMessage>{errors.firstname.message}</ErrorMessage>}
            </InputGroup>
            <InputGroup>
              <Label htmlFor="lastname">{t('customer.lastName')}</Label>
              <Input
                name="lastname"
                type="text"
                ref={register({required: "Familienaam is verplicht"})}
                value={lastName}
                onChange={(e) =>
                  setState({ ...state, lastName: e.target.value })
                }
                required
              />
              {errors.lastname && <ErrorMessage>{errors.lastname.message}</ErrorMessage>}
            </InputGroup>
          </Row>
          <Row>
            <InputGroup>
              <Label htmlFor="email">{t('customer.email')}</Label>
              <Input
                name="email"
                type="email"
                ref={register({required: "Email is verplicht", pattern: {
                  value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: "ongeldig email adres"
                }})}
                value={email}
                onChange={(e) => setState({ ...state, email: e.target.value })}
                required
              />
              {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
            </InputGroup>
          </Row>
          <Row>
            <InputGroup>
              <Label htmlFor="shipping">{t('customer.shipping')}</Label>
              <Input
                name="shipping"
                type="radio"
                value="shipping"
                checked={shipping}
                onChange={(e) => setState({ ...state, shipping: true, pickup: false })}
                required
              />
            </InputGroup>
            <InputGroup>
              <Label htmlFor="pickup">{t('customer.pickup')}</Label>
              <Input
                name="pickup"
                type="radio"
                value="pickup"
                checked={pickup}
                onChange={(e) => setState({ ...state, pickup: true, shipping: false })}
                required
              />
            </InputGroup>
          </Row>
          {Boolean(shipping) && <><Row>
          <InputGroup>
              <Label htmlFor="street">{t('customer.streetAddress')}</Label>
              <Input
                name="street"
                type="text"
                ref={register({required: "Straat is verplicht"})}
                value={street}
                onChange={(e) =>
                  setState({ ...state, street: e.target.value })
                }
                required
              />
              {errors.street && <ErrorMessage>{errors.street.message}</ErrorMessage>}
            </InputGroup>
            <InputGroup>
              <Label htmlFor="streetNumber">{t('customer.streetNumber')}</Label>
              <Input
                name="streetNumber"
                type="number"
                ref={register({required: "Straatnummer is verplicht"})}
                value={streetNumber}
                onChange={(e) =>
                  setState({ ...state, streetNumber: e.target.value })
                }
                required
              />
              {errors.streetNumber && <ErrorMessage>{errors.streetNumber.message}</ErrorMessage>}
            </InputGroup>
          </Row>
          <Row>
          <InputGroup>
              <Label htmlFor="postalCode">{t('customer.postalCode')}</Label>
              <Input
                name="postalCode"
                type="number"
                ref={register({required: "Postcode is verplicht"})}
                value={postalCode}
                onChange={(e) =>
                  setState({ ...state, postalCode: e.target.value })
                }
                required
              />
              {errors.postalCode && <ErrorMessage>{errors.postalCode.message}</ErrorMessage>}
            </InputGroup>
          </Row>
          <Row>
          <InputGroup>
              <Label htmlFor="city">{t('customer.city')}</Label>
              <Input
                name="city"
                type="text"
                ref={register({required: "Stad is verplicht"})}
                value={city}
                onChange={(e) =>
                  setState({ ...state, city: e.target.value })
                }
                required
              />
              {errors.city && <ErrorMessage>{errors.city.message}</ErrorMessage>}
            </InputGroup>
          </Row></> }
        </form>
      </CheckoutFormGroup>

      <Voucher />

      { isValid(checkoutModel) && <CheckoutFormGroup withUpperMargin>
        <div>
          <SectionHeader>{t('checkout.choosePaymentMethod')}</SectionHeader>
          {paymentConfig.loading ? (
            <Spinner />
          ) : (
            <div>
              {enabledPaymentProviders.length === 0 ? (
                <i>{t('checkout.noPaymentProvidersConfigured')}</i>
              ) : (
                <PaymentProviders>
                  <PaymentSelector>
                    {enabledPaymentProviders.map((paymentProviderName) => {
                      const paymentProvider = paymentProviders.find(
                        (p) => p.name === paymentProviderName
                      );
                      if (!paymentProvider) {
                        return (
                          <small>
                            {t('checkout.paymentProviderNotConfigured', {
                              name: paymentProviderName
                            })}
                          </small>
                        );
                      }

                      return (
                        <PaymentButton
                          key={paymentProvider.name}
                          color={paymentProvider.color}
                          type="button"
                          selected={
                            selectedPaymentProvider === paymentProvider.name
                          }
                          onClick={() =>
                            setSelectedPaymentProvider(paymentProvider.name)
                          }
                        >
                          <img
                            src={paymentProvider.logo}
                            alt={t('checkout.paymentProviderLogoAlt', {
                              name: paymentProvider.name
                            })}
                          />
                        </PaymentButton>
                      );
                    })}
                  </PaymentSelector>

                  {paymentProviders
                    .find((p) => p.name === selectedPaymentProvider)
                    ?.render()}
                </PaymentProviders>
              )}
            </div>
          )}
        </div>
      </CheckoutFormGroup> }
    </Inner>
  );
}