import { DefaultSeo } from 'next-seo';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { AuthProvider } from 'components/auth';
import { SettingsProvider } from 'components/settings-context';
import { BasketProvider } from 'components/basket';
import { simplyFetchFromGraph } from 'lib/graph';
import { getLocaleFromContext, defaultLocale } from 'lib/app-config';
import { I18nextProvider } from 'lib/i18n';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps, commonData }) {
  const { mainNavigation, locale, localeResource } = commonData;

  /**
   * Customise these values to match your site
   * Read more here: https://github.com/garmeeh/next-seo#default-seo-configuration
   */
  const SEOSettings = {
    openGraph: {
      type: 'website',
      locale: locale.appLanguage,
      url: 'https://www.anniek-lambrecht.be',
      site_name: 'Skincenter Anniek Lambrecht'
    }
  };

  const theme = extendTheme({
    colors: {
      brand: {
        100: '#fff9f8',
        900: '#f9c8ba'
      }
    },
    fonts: {
      body: 'degular, sans-serif',
      heading: 'degular-display, sans-serif',
      mono: 'degular-display, sans-serif'
    }
  });

  return (
    <>
      <DefaultSeo {...SEOSettings} />
      <QueryClientProvider client={queryClient}>
        <I18nextProvider locale={locale} localeResource={localeResource}>
          <SettingsProvider mainNavigation={mainNavigation}>
            <AuthProvider>
              <BasketProvider locale={locale}>
                <ChakraProvider theme={theme}>
                  <Component {...pageProps} />
                </ChakraProvider>
              </BasketProvider>
            </AuthProvider>
          </SettingsProvider>
        </I18nextProvider>
      </QueryClientProvider>
    </>
  );
}

MyApp.getInitialProps = async function ({ router }) {
  try {
    const locale = getLocaleFromContext(router);

    const localeResource = await import(`../locales/${locale.appLanguage}`);

    /**
     * Get shared data for all pages
     * - Tenant settings
     * - Main navigation
     */
    const {
      data: {
        tenant,
        mainNavigation: { children: mainNavigation }
      }
    } = await simplyFetchFromGraph({
      query: `
        query COMMON_DATA($language: String!) {
          mainNavigation: catalogue(language: $language, path: "/") {
            children {
              type
              name
              path
            }
          }
          tenant(language: $language) {
            name
          }
        }
      `,
      variables: {
        language: locale.crystallizeCatalogueLanguage
      }
    });

    return {
      commonData: {
        localeResource: localeResource.default,
        locale,
        tenant,
        mainNavigation: mainNavigation?.filter((i) => !i.name.startsWith('_'))
      }
    };
  } catch (error) {
    console.error(error);
    console.warn('Could not fetch common page data');

    // Fallback values
    return {
      commonData: {
        mainNavigation: [],
        locale: defaultLocale,
        tenant: {}
      }
    };
  }
};

export default MyApp;
