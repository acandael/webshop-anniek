import fragments from 'lib/graph/fragments';

export default `
  query WEBSHOP($language: String!, $path: String, $version: VersionLabel!) {
    webshop: catalogue(language: $language, path: $path, version: $version) {
      name
      children {
        ...item
        ...product
      }
    }
  }

  ${fragments}
`;
