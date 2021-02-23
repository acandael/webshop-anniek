export default `
  query FOLDER_PAGE($language: String!, $path: String, $version: VersionLabel!) {
    folder: catalogue(language: $language, path: $path, version: $version) {
      name
      components {
        ...component
      }
      children {
        name
        path
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

  fragment itemRelations on ItemRelationsContent {
    items {
      id
      name
      path
      type
      shape {
        name
        id
      }
      topics {
        id
        name 	
      }
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
          ...singleLine
          ...richText
          ...imageContent
          ... on BooleanContent {
            value
          }
          ... on ItemRelationsContent {
            items {
              id
              name
              type
              path
              ... on Item {
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
                  }
                }
              }
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
            }
          }
        }
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
      ...itemRelations
    }
  }
`;