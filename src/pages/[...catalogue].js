/**
 * This file is used when we deal with an unknown url, e.g.:
 * /teddy-bears/fluffy-teddy
 * We need to check on the Crystallize end if this is a valid
 * url, typically by querying the catalogue to see if there is
 * an item with this url as path.
 * If we get nothing back from Crystallize, it's a 404
 */

import React from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import DefaultErrorPage from 'next/error';

import { simplyFetchFromGraph } from 'lib/graph';
import { urlToSpec } from 'lib/search';
import { getLocaleFromContext, getValidLocale } from 'lib/app-config';
import Layout from 'components/layout';

import DocPage, { getData as getDataDoc } from 'page-components/document';
import FolderPage, { getData as getDataFolder } from 'page-components/folder';
import ProdPage, { getData as getDataProd } from 'page-components/product';
import SearchPage, { getData as getDataSearch } from 'page-components/search';
import WebshopPage, {
  getData as getDataWebshop
} from 'page-components/webshop';
import BrandPage, { getData as getDataBrand } from 'page-components/brand';
import ProductLinePage, {
  getData as getDataProductLine
} from 'page-components/product-line';
import CategoryPage, {
  getData as getDataCategory
} from 'page-components/category';
import BehandelingenPage, {
  getData as getDataBehandelingen
} from 'page-components/behandelingen';
import BehandelingPage, {
  getData as getDataBehandeling
} from 'page-components/behandeling';
import BrandArticlePage, {
  getData as getDataBrandArticle
} from 'page-components/brand-article';
import MerkenPage, { getData as getDataMerken } from 'page-components/merken';
import KadobonnenPage, {
  getData as getDataKadobonnen
} from 'page-components/kadobonnen';

const renderers = {
  document: {
    component: DocPage,
    getData: getDataDoc
  },
  brandarticle: {
    component: BrandArticlePage,
    getData: getDataBrandArticle
  },
  folder: {
    component: FolderPage,
    getData: getDataFolder
  },
  product: {
    component: ProdPage,
    getData: getDataProd
  },
  search: {
    component: SearchPage,
    getData: getDataSearch
  },
  webshop: {
    component: WebshopPage,
    getData: getDataWebshop
  },
  brand: {
    component: BrandPage,
    getData: getDataBrand
  },
  productline: {
    component: ProductLinePage,
    getData: getDataProductLine
  },
  category: {
    component: CategoryPage,
    getData: getDataCategory
  },
  behandelingen: {
    component: BehandelingenPage,
    getData: getDataBehandelingen
  },
  behandeling: {
    component: BehandelingPage,
    getData: getDataBehandeling
  },
  merken: {
    component: MerkenPage,
    getData: getDataMerken
  },
  kadobonnen: {
    component: KadobonnenPage,
    getData: getDataKadobonnen
  }
};

export async function getStaticProps(context) {
  const { params, preview } = context;
  const { catalogue } = params;
  const locale = getLocaleFromContext(context);

  let asPath;
  try {
    asPath = `/${catalogue.join('/')}`;

    // Get the item type
    const getItemType = await simplyFetchFromGraph({
      query: `
        query ITEM_TYPE($language: String!, $path: String!) {
          catalogue(language: $language, path: $path) {
            type
            language
            children {
              type
            }
            shape {
              name
            }
          }
        }
      `,
      variables: {
        language: locale.crystallizeCatalogueLanguage,
        path: asPath
      }
    });

    const {
      type,
      shape: { name: shapeName }
    } = getItemType.data.catalogue;

    let renderer = 'folder';

    if (shapeName === 'Webshop') {
      renderer = 'webshop';
    } else if (shapeName === 'Merk') {
      renderer = 'brand';
    } else if (shapeName === 'Lijn') {
      renderer = 'productline';
    } else if (shapeName === 'Categorie') {
      renderer = 'category';
    } else if (shapeName === 'Behandelingen') {
      renderer = 'behandelingen';
    } else if (shapeName === 'Behandeling') {
      renderer = 'behandeling';
    } else if (shapeName === 'BrandArticle') {
      renderer = 'brandarticle';
    } else if (shapeName === 'Merken') {
      renderer = 'merken';
    } else if (shapeName === 'Kadobonnen') {
      renderer = 'kadobonnen';
    } else if (type in renderers) {
      renderer = type;
    }

    const data = await renderers[renderer].getData({
      asPath,
      language: locale.crystallizeCatalogueLanguage,
      preview,
      ...(renderer === 'search' && {
        searchSpec: {
          type: 'PRODUCT',
          ...urlToSpec({ asPath }, locale)
        }
      })
    });

    return {
      props: {
        ...data,
        asPath,
        renderer
      },
      revalidate: 1
    };
  } catch (error) {
    console.log(error);
    console.warn(`Could not get data for ${asPath}`);
  }

  return {
    props: {},
    revalidate: 1
  };
}

export async function getStaticPaths({ locales, defaultLocale }) {
  const paths = [];

  await Promise.all((locales || ['en']).map(handleLocale));

  async function handleLocale(localeName) {
    const locale = getValidLocale(localeName);

    function handleItem({ path, name, children }) {
      if (path !== '/index' && !name?.startsWith('_')) {
        if (defaultLocale !== locale.locale) {
          paths.push(`/${locale.locale}${path}`);
        } else {
          paths.push(path);
        }
      }

      children?.forEach(handleItem);
    }

    try {
      const allCatalogueItems = await simplyFetchFromGraph({
        query: `
          query GET_ALL_CATALOGUE_ITEMS($language: String!) {
            catalogue(language: $language, path: "/") {
              path
              name
              children {
                path
                name
                children {
                  path
                  name
                  children {
                    path
                    name
                    children {
                      path
                      name
                      children {
                        path
                        name
                        children {
                          path
                          name
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        `,
        variables: {
          language: locale.crystallizeCatalogueLanguage
        }
      });

      allCatalogueItems.data.catalogue.children?.forEach(handleItem);
    } catch (error) {
      console.error(
        'Could not get all catalogue items for ',
        JSON.stringify(locale, null, 3)
      );
      console.log(error);
    }
  }

  return {
    paths,
    fallback: true
  };
}

export default function GenericCatalogueItem({ renderer, asPath, ...rest }) {
  const router = useRouter();
  const Component = (renderers[renderer] || renderers.folder).component;

  if (router.isFallback) {
    return <Layout loading />;
  }

  // No data was found for route. It's a 404
  if (Object.keys(rest).length === 0) {
    return (
      <>
        <Head>
          <meta name="robots" content="noindex" />
        </Head>
        <DefaultErrorPage statusCode={404} />
      </>
    );
  }

  return <Component key={asPath} {...rest} />;
}
