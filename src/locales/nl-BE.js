export default {
  translation: {
    common: {
      price: '{{value, currency}}',
      shipping: 'Verzendkosten: {{value, currency}}',
      vat: 'VAT: {{value, currency}}'
    },
    frontpage: {
      title: 'Home'
    },
    customer: {
      name: 'Naam',
      firstName: 'Voornaam',
      lastName: 'Familienaam',
      street: 'Straat',
      streetNumber: 'Straatnummer',
      postalCode: 'Postcode',
      city: 'Stad',
      email: 'Email',
      emailPlaceholder: 'you@your.place',
      shipping: 'Opsturen (8 Euro)',
      pickup: 'Afhalen',
      login: {
        title: 'Login',
        loggedIn: 'Je bent ingelogd',
        instructions:
          'Vul je emailadres in en we sturen een magic link naar je mailbox',
        emailAddressInvalid: 'Gelieve een geldig emailadres in te geven',
        sendMagicLink: 'Stuur me een magic link'
      }
    },
    product: {
      relatedProduct: 'Aanbevolen Combinatie',
      relatedProduct_plural: 'Aanbevolen Combinaties',
      addToBasket: 'Toevoegen aan Winkelmand',
      stock: '{{stockCount}} in voorraad',
      outOfStock: 'Niet in voorraad',
      buy: 'BUY',
      attributes: {
        color: 'Kleur',
        green: 'Groen',
        blue: 'Blauw',
        black: 'Zwart'
      }
    },
    basket: {
      title: 'Winkelmand',
      loading: 'Even geduld. We halen je winkelmand op...',
      removeItem: 'Verwijder {{name}} uit winkelmand',
      empty: 'Je winkelmand is leeg',
      empty_inCheckout: 'Je hebt geen items in je winkelmand',
      remainingUntilFreeShipping:
        'Add another {{amount, currency}} to your order for free shipping.',
      totalPrice: 'Totaal',
      discount: 'Korting',
      totalPriceAfterDiscount: 'Totaal na korting',
      shippingPrice: 'Shipping',
      vat: 'BTW',
      totalToPay: 'Te betalen',
      goToCheckout: 'Afrekenen'
    },
    checkout: {
      title: 'Afrekenen',
      payNow: 'Betaal nu',
      choosePaymentMethod: 'Kies betaalmethode',
      noPaymentProvidersConfigured: 'Er zijn geen betaal providers geconfigureerd',
      paymentProviderNotConfigured:
        'Betaal provider {{name}} is niet geconfigureerd',
      paymentProviderLogoAlt: 'Logo for {{name}}',
      confirmingCardPayment: 'Een ogenblikje je kaartgegevens worden geverifieerd...',
      loadingPaymentGateway: 'De betaal gateway wordt geïnitialiseerd...',
      loadingPaymentGatewayFailed:
        'Oei. De {{name}} payment gateway kon niet worden geladen',
      confirmation: {
        title: 'Bestelbevestiging',
        shortStatus: `Je bestelling werd bevestigd.`,
        shortStatus_withEmail: `Je bestelling werd bevestigd. Een kopie van je bestelling werd verstuurd naar {{email}}`
      }
    },
    order: {
      total: 'Totaal',
      item: 'Besteld item',
      item_plural: 'Bestelde items'
    },
    layout: {
      menu: 'Menu',
      searchPlaceholder: 'Zoek producten',
      ecomBy: 'eCommerce by',
      loadingVideo: 'Loading video'
    },
    search: {
      foundResults: '{{count}} gevonden resultaten',
      foundResults_plural: '{{count}} gevonden resultaten',
      orderTitle: 'Order by',
      order: {
        ITEM_NAME_ASC: 'Name ascending',
        ITEM_NAME_DESC: 'Name descending',
        PRICE_ASC: 'Price ascending',
        PRICE_DESC: 'Price descending',
        STOCK_ASC: 'Stock ascending',
        STOCK_DESC: 'Stock descending'
      },
      filterResults: 'Filter results',
      facets: {
        viewNResults: 'Show {{count}} result',
        viewNResults_plural: 'Show {{count}} results',
        reset: 'Reset',
        price: {
          title: 'Price',
          min: 'Minimum price',
          max: 'Maximum price'
        }
      }
    }
  }
};
