import fragments from 'lib/graph/fragments';

export default `
  query CATEGORY($language: String!, $path: String, $version: VersionLabel!) {
    category: catalogue(language: $language, path: $path, version: $version) {
      ...item

      children {
        ...item
        ...product
      }
    }
  }

  ${fragments}
`;
