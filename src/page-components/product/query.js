export default `
  query PRODUCT_PAGE($language: String!, $path: String, $version: VersionLabel!) {
    product: catalogue(language: $language, path: $path, version: $version) {
      ...item
      ...product
    }
  }

  fragment product on Product {
    id
    language
    vatType {
      name
      percent
    }
    variants {
      id
      name
      sku
      priceVariants {
        identifier
        price
        currency
      }
      stock
      isDefault
      attributes {
        attribute
        value
      }
      images {
        url
        altText
        variants {
          url
          width
          height
        }
      }
    }
  }

  fragment item on Item {
    id
    name
    type
    path

    components {
      name
      type
      meta {
        key
        value
      }
      content {
        ...singleLine
        ...richText
        ...imageContent
        ...paragraphCollection
        ...itemRelations
        ...propertiesTableContent
      }
    }
  }

  fragment singleLine on SingleLineContent {
    text
  }

  fragment richText on RichTextContent {
    json
  }

  fragment image on Image {
    url
    altText
    variants {
      url
      width
      height
    }
  }

  fragment imageContent on ImageContent {
    images {
      ...image
    }
  }

  fragment paragraphCollection on ParagraphCollectionContent {
    paragraphs {
      title {
        ...singleLine
      }
      body {
        ...richText
      }
    }
  }

  fragment itemRelations on ItemRelationsContent {
    items {
      id
      name
      path
      ... on Product {
        variants {
          priceVariants {
            identifier
            price
            currency
          }
          isDefault
          name
          image {
            ...image
          }
        }
      }
      components {
        name
        type
        content {
          ...imageContent
        }
      }
    }
  }

  fragment propertiesTableContent on PropertiesTableContent {
    sections {
      title
      properties {
        key
        value
      }
    }
  }
`;
