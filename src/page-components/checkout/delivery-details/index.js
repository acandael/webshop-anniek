import React from 'react';
import styled from 'styled-components';

import { responsive, H3 } from 'ui';

const Outer = styled.div`
  width: 300px;

  p {
    margin-bottom: 0.5rem;
  }

  ${responsive.xs} {
    width: 100%;
  }
`;

const Inner = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  font-size: 16px;
`;

const DeliveryDetails = ({ order }) => {
  // const t = useT();
  const address = order.customer.addresses?.[1];

  return (
    <Outer>
      <Inner>
        <H3>Leveringsadres</H3>
        <p>
          Straat:{' '}
          <strong>
            {address.street} {address.streetNumber}
          </strong>
        </p>
        <p>
          Stad: <strong>{address.city}</strong>
        </p>
        <p>
          Postcode: <strong>{address.postalCode}</strong>
        </p>
      </Inner>
    </Outer>
  );
};

export default DeliveryDetails;
