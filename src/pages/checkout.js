export { default } from 'page-components/checkout';

export async function getServerSideProps({
  query: { redirect_status = null }
}) {
  return {
    props: { redirect_status } // will be passed to the page component as props
  };
}
