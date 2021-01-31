import fragments from 'lib/graph/fragments';

export default `
  query BEHANDELINGEN_PAGE($language: String!, $path: String, $version: VersionLabel!) {
    folder: catalogue(language: $language, path: $path, version: $version) {
      ...item

      children {
        ...item
        ...product
      }
    }
  }

  ${fragments}
`;
