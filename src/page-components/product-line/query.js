export default `
  query FOLDER_PAGE($language: String!, $path: String, $version: VersionLabel!) {
    folder: catalogue(language: $language, path: $path, version: $version) {
      name
      path
     
       children {
         name
         path
         ...variants
         components {
          ...component
         }
       }
    }
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

  fragment singleLine on SingleLineContent {
    text
  }

  fragment richText on RichTextContent {
    json
  }

  fragment paragraphCollection on ParagraphCollectionContent {
    paragraphs {
      body {
        ...richText
      }
    }
  }

  fragment component on Component {
    name
    type
    content {
      ...singleLine
      ...imageContent
      ...paragraphCollection
    }
  }

  fragment variants on Product {
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
    }
  }
`;
