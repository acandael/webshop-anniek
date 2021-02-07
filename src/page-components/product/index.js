import React, { useState } from 'react';
import { Image as Img } from '@crystallize/react-image';
import ContentTransformer from 'ui/content-transformer';
import { simplyFetchFromGraph } from 'lib/graph';
import Layout from 'components/layout';
import ShapeComponents from 'components/shape/components';
import toText from '@crystallize/content-transformer/toText';
import getRelativePriceVariants from 'lib/pricing';
import { useLocale } from 'lib/app-config';
import Collection from 'components/item-collection';

import TopicTag from 'components/topic-tag';
import VariantSelector from './variant-selector';
import Buy from './buy';
import query from './query';
import SchemaOrg from './schema';
import Stock from './stock';
import { useT } from 'lib/i18n';

import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react"
import PropertiesTable from 'components/shape/behandeling-components/properties-table';

import {
  Inner,
  Media,
  ImgContainer,
  Actions,
  ActionsSticky,
  Title,
  Summary,
  Content,
  Description,
  Usage,
  DescriptionWrapper,
  RelatedContainer
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
  const locale = useLocale();
  const t = useT();
  const { name, components = [], variants = [], topics = [] } = product;

  // Set the selected variant to the default
  const [selectedVariant, setSelectedVariant] = useState(
    variants.find((variant) => variant.isDefault)
  );

  function onVariantChange(variant) {
    setSelectedVariant(variant);
  }

  const pricing = getRelativePriceVariants({
    variant: selectedVariant,
    locale
  });

  // Find content from the GraphQl response:
  const summaryComponent = components.find(isSumaryComponent);
  const descriptionComponent = components.find(isDescriptionComponent);
  const relatedProducts = components.find(isRelatedProductsComponent)?.content
    ?.items;

  const ingredients = product.components?.find(
    (c) => c.name === 'Ingredienten'
  );

  const usage = product.components?.find(
    (c) => c.name === 'Gebruiksaanwijzing'
  );

  const quantity = product.components?.find(
    (c) => c.name === 'Hoeveelheid'
  );

  const ingredientstable = product.components?.find((c) => c.type === 'propertiesTable').content

  const hasMoreThanOneVariant = variants.length > 1;

  let tabs;

  if (usage.content?.paragraphs?.[0]?.body.json?.[0]?.children.length > 0 || ingredients.content?.paragraphs?.[0]?.body.json?.[0]?.children.length > 0) {
    tabs = (
      <Usage>
        <Tabs colorScheme="brand" isLazy size="md">
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
      title={name}
      image={selectedVariant?.images?.[0]?.url}
      description={toText(summaryComponent?.content?.json)}
      preview={preview}
    >
      <SchemaOrg {...product} summary={summaryComponent} />
      <Inner>
        <Content>
          <Media>
            {selectedVariant?.images?.map((img) => {
              const isPrortraitImage =
                img?.variants?.[0].height >= img?.variants?.[0]?.width;
              return (
                <ImgContainer key={img?.url} portrait={isPrortraitImage}>
                  <Img {...img} alt={name} />
                </ImgContainer>
              );
            })}
          </Media>
          {descriptionComponent && (
            <Description>
              <DescriptionWrapper>
                <ShapeComponents
                  className="description"
                  components={[descriptionComponent]}
                />
              </DescriptionWrapper>
            </Description>
          )}
          {tabs}
        </Content>
        <Actions>
          <ActionsSticky>
            <Title>{name}</Title>
            {summaryComponent && (
              <Summary>
                <ContentTransformer {...descriptionComponent?.content?.json} />
              </Summary>
            )}
            {topics?.map((topic) => (
              <TopicTag {...topic} key={topic.id} />
            ))}
            {hasMoreThanOneVariant && (
              <VariantSelector
                variants={variants}
                selectedVariant={selectedVariant}
                onVariantChange={onVariantChange}
              />
            )}
            <Buy
              product={product}
              selectedVariant={selectedVariant}
              pricing={pricing}
            />
            <Stock selectedVariant={selectedVariant} />
          </ActionsSticky>
        </Actions>
      </Inner>
      <PropertiesTable {...ingredientstable} />
      <RelatedContainer>
        {Boolean(relatedProducts) && (
          <Collection
            items={relatedProducts}
            title={t('product.relatedProduct')}
          />
        )}
      </RelatedContainer>
    </Layout>
  );
}

function isSumaryComponent({ name }) {
  return name === 'Summary';
}

function isDescriptionComponent({ name }) {
  return name === 'Beschrijving';
}

function isRelatedProductsComponent({ name }) {
  return name === 'Aanbevolen Combinaties';
}