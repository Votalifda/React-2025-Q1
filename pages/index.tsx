import Head from "next/head";
import Link from 'next/link';
import { GetServerSideProps } from "next";


export const getServerSideProps: GetServerSideProps = async () => {
  await store.dispatch(api.endpoints.getPosts.initiate());
  return { props: {} };
};
export default function Home() {
  return (
    <>
      <Head>
        <title>Main</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <main>
          Main
          <Link href="/details">Details</Link>
        </main>
      </div>
    </>
  );
}
