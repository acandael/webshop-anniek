import styled from 'styled-components';

import { responsive } from 'ui';

import ItemMicroformat from 'components/microformat';

const Outer = styled.ul`
  display: grid;
  list-style: none;
  margin: 0;
  padding: 0;
  grid-gap: 20px;

  ${responsive.sm} {
    grid-template-columns: 1fr 1fr;
  }

  ${responsive.mdPlus} {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const ListItem = styled.li``;

export default function ItemRelations({ items }) {
  if (!items) {
    return null;
  }

  return (
    <Outer>
      {items.map((item) => (
        <ListItem key={item.id}>
          <ItemMicroformat {...item} />
        </ListItem>
      ))}
    </Outer>
  );
}
