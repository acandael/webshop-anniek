import fragments from 'lib/graph/fragments';

export default `
  query BRAND($language: String!, $path: String, $version: VersionLabel!) {
    brand: catalogue(language: $language, path: $path, version: $version) {
      ...item

      children {
        ...item
        ...product
      }
    }
  }

  ${fragments}
`;
