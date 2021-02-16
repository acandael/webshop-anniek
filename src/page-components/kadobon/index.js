import React, { useState } from 'react';
import { Outer, H1, Button } from 'ui';
import Layout from 'components/layout';
import { sendGiftCard } from 'components/auth';
import { useT } from 'lib/i18n';

import {LoginStyle, KadoHeader, HeroSection, HeroText, HeroImage, H3, Fields} from './styles'
import Breadcrumb from 'components/breadcrumb';
import Image from 'next/image';

export default function KadobonPage() {
  
  const [userData, setUserData] = useState({
    loading: false,
    aanbieder: '',
    email: '',
    message: '',
    amount: '',
    error: ''
  });

  const [isSent, setIsSent] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    setUserData(Object.assign({}, userData, { loading: true, error: '' }));
    const { email, aanbieder, message, amount  } = userData;

    try {
      const { error, msg } = await sendGiftCard(email, aanbieder, message, amount);
      
      if (error) {
        console.error('Giftcard was not send');
        throw error;
      }

      setUserData(
        Object.assign({}, userData, {
          loading: false,
          message: msg
        })
      );
      setIsSent(true);
    } catch (error) {
      console.error(
        'You have an error in your code or there are Network issues.',
        error
      );

      const { response } = error;
      setUserData(
        Object.assign({}, userData, {
          loading: false,
          error: response ? response.statusText : error.message
        })
      );
    }
  }

  return (
    <Layout
      title='kadobon'
      description='Schenk een kadobon'
    >
      <Outer>
        <Breadcrumb path="/Home/kadobon" />
        <KadoHeader centerContent>
          <H1>Kadobon</H1>
        </KadoHeader>
        <HeroSection>
          <HeroText>
          {Boolean(isSent) === false ? <LoginStyle>
          <form onSubmit={handleSubmit} action="/api/kadobon" method="post">
              <H3>Bestel online je kadobon</H3>
              <Fields>
                <label htmlFor="aanbieder">Aangeboden door:</label>
                <input
                  id="aanbieder"
                  type="text"
                  name="aanbieder"
                  required
                  onChange={(event) =>
                    setUserData(
                      Object.assign({}, userData, {
                        aanbieder: event.target.value
                      })
                    )
                  }
                />
                 <input
                  type="email"
                  name="email"
                  placeholder="jij@email.be"
                  required
                  onChange={(event) =>
                    setUserData(
                      Object.assign({}, userData, {
                        email: event.target.value
                      })
                    )
                  }
                />
                <label htmlFor="message">Extra vragen of info:</label>
                <textarea rows="5" cols="15"
                  type="text"
                  name="message"
                  onChange={(event) =>
                    setUserData(
                      Object.assign({}, userData, {
                        message: event.target.value
                      })
                    )
                  }
                />
                <label htmlFor="amount">Bedrag:</label>
                <input
                  type="text"
                  name="amount"
                  required
                  onChange={(event) =>
                    setUserData(
                      Object.assign({}, userData, {
                        amount: event.target.value
                      })
                    )
                  }
                />
                <Button
                  state={userData.loading ? 'loading' : null}
                  type="submit"
                  value="Submit"
                >
                  Bestel Kadobon
                </Button>
              </Fields>
            </form>
            </LoginStyle> :
            <>
              <H3>Bedankt! Je kadobon word klaargemaakt</H3>
              <p>
              Email: {userData.email}<br />
              Aanbieder: {userData.aanbieder}<br />
              Bedrag: {userData.amount}
              </p>
            </>
            }
          </HeroText>
          <HeroImage>
            <Image src="/static/kadobon.jpg" alt="kadobon" width={561} height={433} />
          </HeroImage>
        </HeroSection>
      </Outer>
    </Layout>
  );
}