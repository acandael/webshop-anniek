import React from 'react';

import Layout from 'components/layout';
import { H1, Button } from 'ui';
import { useAuth } from 'components/auth';
import { useT } from 'lib/i18n';
import Router from 'next/router'

import { Outer } from './styles';

export default function MyAccount() {
  const t = useT();
  const auth = useAuth();

  return (
    <Layout title={t('customer.account.title')}>
      <Outer>
        {auth.isLoggedIn === true && (
          <div>
            <H1>Hallo {auth.email}!</H1>
            <Button onClick={() => Router.push(auth.logoutLink)}>Uitloggen</Button>
          </div>
        )}
        {auth.isLoggedIn === false && <div>Je bent niet ingelogd</div>}
      </Outer>
    </Layout>
  );
}