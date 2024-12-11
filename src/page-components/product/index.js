import React, { useState } from 'react';
import { Image as Img } from '@crystallize/react-image';
import { ContentTransformer as Transformer } from '@crystallize/reactjs-components';
import { simplyFetchFromGraph } from 'lib/graph';
import Layout from 'components/layout';
import toText from '@crystallize/content-transformer/toText';
import getRelativePriceVariants from 'lib/pricing';
import { useLocale } from 'lib/app-config';
import Collection from 'components/item-collection';
import Breadcrumb from 'components/breadcrumb';
import TopicTag from 'components/topic-tag';
import VariantSelector from './variant-selector';
import Buy from './buy';
import query from './query';
import SchemaOrg from './schema';
import { useT } from 'lib/i18n';

import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import PropertiesTable from 'components/shape/behandeling-components/properties-table';

import {
  Inner,
  BreadcrumbWrapper,
  Media,
  ImgContainer,
  Actions,
  ActionsSticky,
  Title,
  Summary,
  Content,
  Usage,
  RelatedContainer,
  Quantity
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

  const ingredients = product?.components.find(
    (c) => c.name === 'Ingredienten'
  );

  const usage = product?.components.find(
    (c) => c.name === 'Gebruiksaanwijzing'
  );

  const gebruiksvoorwaarden = product?.components.find(
    (c) => c.name === 'Gebruiksvoorwaarden'
  );

  const quantity = product?.components?.find((c) => c.name === 'Hoeveelheid');

  const ingredientstable = product.components?.find(
    (c) => c.type === 'propertiesTable'
  )?.content;

  const hasMoreThanOneVariant = variants.length > 1;

  let tabs;

  if (
    usage?.content?.paragraphs?.length > 0 ||
    ingredients?.content?.paragraphs?.length > 0
  ) {
    tabs = (
      <Usage>
        <Tabs colorScheme="brand" isLazy size="md">
          <TabList>
            <Tab>Gebruiksaanwijzing</Tab>
            <Tab>Ingrediënten</Tab>
            <Tab>Gebruiksvoorwaarden</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              {usage?.content?.paragraphs
                .filter((paragraph) => paragraph?.body || paragraph?.title)
                .map((paragraph, index) => (
                  <div key={index}>
                    {paragraph?.title?.text && (
                      <strong>{paragraph?.title?.text}</strong>
                    )}
                    <Transformer json={paragraph?.body?.json} />
                  </div>
                ))}
            </TabPanel>
            <TabPanel>
              {ingredients?.content?.paragraphs
                .filter((paragraph) => paragraph?.body || paragraph?.title)
                .map((paragraph, index) => (
                  <div key={index}>
                    {paragraph?.title?.text && (
                      <strong>{paragraph?.title?.text}</strong>
                    )}
                    <Transformer json={paragraph.body.json} />
                  </div>
                ))}
            </TabPanel>
            <TabPanel>
              {gebruiksvoorwaarden?.content?.paragraphs
                .filter((paragraph) => paragraph?.body || paragraph?.title)
                .map((paragraph, index) => (
                  <div key={index}>
                    {paragraph?.title?.text && (
                      <strong>{paragraph?.title?.text}</strong>
                    )}
                    <Transformer json={paragraph.body.json} />
                  </div>
                ))}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Usage>
    );
  }

  return (
    <Layout
      title={name}
      image={selectedVariant?.images?.[0]?.url}
      description={toText(summaryComponent?.content?.json)}
      preview={preview}
    >
      <SchemaOrg {...product} summary={summaryComponent} />
      <BreadcrumbWrapper>
        <Breadcrumb path={product.path} />
      </BreadcrumbWrapper>
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
          {tabs}
          <PropertiesTable {...ingredientstable} />
        </Content>
        <Actions>
          <ActionsSticky>
            <Title>{name}</Title>
            {descriptionComponent && (
              <Summary>
                {descriptionComponent.content.paragraphs
                  .filter((paragraph) => paragraph?.body || paragraph?.title)
                  .map((paragraph, index) => (
                    <div key={index}>
                      {paragraph?.title?.text && (
                        <strong>{paragraph?.title?.text}</strong>
                      )}

                      <Transformer json={paragraph.body.json} />
                      <br />
                    </div>
                  ))}
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
            {quantity?.content && (
              <Quantity>
                {quantity && `Hoeveelheid: ${quantity?.content?.text}`}
              </Quantity>
            )}
            {/* <Stock selectedVariant={selectedVariant} /> */}
          </ActionsSticky>
          <Content>
            <p>
              <br />
            </p>
            <p>
              EU Responsible Person{' '}
              <a href="www.biorius.com">www.biorius.com</a>
            </p>
            <p>
              Naam: Biorius
              <br />
              Adres: Avenue Léonard de Vinci 14, 1300 Wavre Belgium
              <br />
              Elektronische contactgegevens:{' '}
              <a href="mailto:info@biorius.com">info@biorius.com</a> /{' '}
              <a href="tel:+3228884010">+32 2 888 4010</a>
            </p>
          </Content>
        </Actions>
      </Inner>

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
