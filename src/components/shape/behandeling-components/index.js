import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import ContentTransformer from 'ui/content-transformer';

import { responsive, H3 } from 'ui';

import ParagraphCollection from './paragraph-collection';
import PropertiesTable from './properties-table';
import ItemRelations from './item-relations';
import GridRelations from './grid-relations';

const ContentOuter = styled.div`

  ${responsive.xs} {
    margin: 0;
  }
`;

const BehandelingComponents = ({ components, overrides }) => {
  if (!components || !Array.isArray(components)) {
    return null;
  }

  return (
    <div>
      {components
        ?.filter((component) => component.content != null)
        .map(({ type, ...component }, index) => {
          const key = index;
          let Component;

          // Check for overrides
          if (overrides && overrides[component.name]) {
            Component = overrides[component.name];
          }

          if (type === 'paragraphCollection') {
            if (!component.content.paragraphs) {
              return null;
            }

            Component = Component || ParagraphCollection;

            return (
              <Component key={key} paragraphs={component.content.paragraphs} />
            );
          }

          if (type === 'richText') {
            if (!component.content.json) {
              return null;
            }
            Component = Component || 'div';
            return (
              <ContentOuter key={key}>
                <Component>
                  <ContentTransformer {...component.content.json} />
                </Component>
              </ContentOuter>
            );
          }

          if (type === 'singleLine') {
            Component = Component || 'div';
            return (
              <ContentOuter key={key}>
                <Component><H3>{component.content.text}</H3></Component>
              </ContentOuter>
            );
          }

          if (type === 'propertiesTable') {
            Component = Component || PropertiesTable;
            
            return (
              <ContentOuter key={key}>
                <Component {...component.content} />
              </ContentOuter>
            );
          }

          if (type === 'itemRelations') {
            Component = Component || ItemRelations;
            return <Component key={key} items={component.content.items} />;
          }

          if (type === 'gridRelations') {
            Component = Component || GridRelations;

            return <Component key={key} grids={component.content.grids} />;
          }

          if (process.env.NODE_ENV !== 'production') {
            console.log(`Render for ${type} not implemented`);
          }

          return <span key={key} />;
        })}
    </div>
  );
};

BehandelingComponents.propTypes = {
  components: PropTypes.array.isRequired,
  overrides: PropTypes.object
};

export default BehandelingComponents;
