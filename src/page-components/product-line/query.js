import fragments from 'lib/graph/fragments';

export default `
  query PRODUCT_LINE($language: String!, $path: String, $version: VersionLabel!) {
    productline: catalogue(language: $language, path: $path, version: $version) {
      ...item

      children {
        ...item
        ...product
      }
    }
  }

  ${fragments}
`;
