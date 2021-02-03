export default `
  query FOLDER_PAGE($language: String!, $path: String, $version: VersionLabel!) {
    folder: catalogue(language: $language, path: $path, version: $version) {
      name
      path
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

  fragment component on Component {
    name
    type
    content {
      ...singleLine
      ...imageContent
      ...paragraphCollection
    }
  }
`;