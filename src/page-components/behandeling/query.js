export default `
  query FOLDER_PAGE($language: String!, $path: String, $version: VersionLabel!) {
    folder: catalogue(language: $language, path: $path, version: $version) {
      ...item
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
        ...propertiesTableContent
      }
    }
  }
  fragment image on Image {
    url
    altText
    key
    variants {
      url
      width
      key
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
      title {
        ...singleLine
      }
      body {
        ...richText
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
