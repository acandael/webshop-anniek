import React, {useState} from 'react';
import { sendGiftcardConfirmation } from 'lib/rest-api';
import { Outer, H1, Button } from 'ui';
import Layout from 'components/layout';
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

  async function handleSubmit(event) {
    event.preventDefault();

    setUserData(Object.assign({}, userData, { loading: true, error: '' }));
    const { email, aanbieder, message, amount  } = userData;

    try {
      const { error, msg } = await sendGiftcardConfirmation(email, aanbieder, message, amount);

      if (error) {
        console.error('Login failed');
        throw error;
      }

      setUserData(
        Object.assign({}, userData, {
          loading: false,
          message: msg
        })
      );
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
          <LoginStyle>
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
            </LoginStyle>
          </HeroText>
          <HeroImage>
            <Image src="/static/kadobon.jpg" alt="kadobon" width={561} height={433} />
          </HeroImage>
        </HeroSection>
      </Outer>
    </Layout>
  );
}
