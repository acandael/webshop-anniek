import React, { useState } from 'react';
import { Image as Img } from '@crystallize/react-image';
import ContentTransformer from 'ui/content-transformer';
import { simplyFetchFromGraph } from 'lib/graph';
import { screen } from 'ui';
import Layout from 'components/layout';
import Breadcrumb from 'components/breadcrumb'
import toText from '@crystallize/content-transformer/toText';
import { Outer} from 'ui';
import VariantSelector from './variant-selector';
import Buy from './buy';
import query from './query';
import SchemaOrg from './schema';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react"


import {
  Sections,
  Media,
  MediaInner,
  Name,
  Info,
  Description,
  Usage,
} from './styles';

export async function getData({ asPath, language, preview = null }) {
  const { data } = await simplyFetchFromGraph({
    query,
    variables: {
      path: asPath,
      language,
      version: preview ? 'draft' : 'published'
    }
  });
  return { ...data, preview };
}

export default function ProductPage({ product, preview }) {
  // Set the selected variant to the default
  const [selectedVariant, setSelectedVariant] = useState(
    product.variants.find((v) => v.isDefault)
  );
  function onVariantChange(variant) {
    setSelectedVariant(variant);
  }

  
  const description = product.components?.find(
    (c) => c.name === 'Beschrijving'
  );

  const usage = product.components?.find(
    (c) => c.name === 'Gebruiksaanwijzing'
  );

  const ingredients = product.components?.find(
    (c) => c.name === 'Ingredienten'
  );

  const quantity = product.components?.find(
    (c) => c.name === 'Hoeveelheid'
  );

  let tabs;

    if (usage.content.paragraphs?.[0]?.body.json?.[0]?.children.length > 0 || ingredients.content.paragraphs?.[0]?.body.json?.[0]?.children.length > 0) {
      tabs = (
        <Usage>
              <Tabs colorScheme="pink" isLazy size="md">
                  <TabList>
                    <Tab>Gebruiksaanwijzing</Tab>
                    <Tab>Ingrediënten</Tab>
                  </TabList>

                  <TabPanels>
                    <TabPanel>
                      <ContentTransformer {...usage?.content?.paragraphs?.[0]?.body.json} />
                    </TabPanel>
                    <TabPanel>
                    <ContentTransformer {...ingredients?.content?.paragraphs?.[0]?.body.json} />
                    </TabPanel>
                  </TabPanels>
                </Tabs>
            </Usage>
      )
      
    
  }
  
  return (
    <Layout
      title={product.name}
      image={selectedVariant?.images?.[0]?.url}
      description={toText(description)}
      preview={preview}
    >
      <SchemaOrg {...product} summary={description} />
      <Outer>
        <Breadcrumb path={product.path} />
        <Sections>
          <Media>
            <MediaInner>
              <Img
                {...selectedVariant.images?.[0]}
                sizes={`(max-width: ${screen.sm}px) 400px, 60vw`}
                alt={product.name}
              />
            </MediaInner>
          </Media>
          <Info>
            <Name>{product.name}</Name>
            {description && (
              <Description>
                <ContentTransformer {...description?.content?.paragraphs?.[0]?.body.json} />
              </Description>
            )}

            {product.variants?.length > 1 && (
              <VariantSelector
                variants={product.variants}
                selectedVariant={selectedVariant}
                onVariantChange={onVariantChange}
              />
            )}
            <Buy product={product} selectedVariant={selectedVariant} quantity={quantity && quantity.content.text} />
            {tabs}
          </Info>
        </Sections>
      </Outer>
    </Layout>
  );
}
