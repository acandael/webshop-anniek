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
          ...gridRelations
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

  fragment gridRelations on GridRelationsContent {
    grids {
      name
      rows {
        columns {
          layout {
            rowspan
            colspan
          }
          itemType
          itemId
          item {
            id
            name
            path
            type
            language
            ... on Product {
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
                image {
                  url
                  altText
                  variants {
                    url
                    width
                    height
                  }
                }
              }
              defaultVariant {
                priceVariants {
                  identifier
                  price
                  currency
                }
                isDefault
                name
                images {
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