import { type NextPage } from "next";
import Head from "next/head";

const SinglePostView: NextPage = () => {
  return (
    <>
      <Head>
        <title>Post</title>
        <meta name="description" content="Welcome to Twitter Clone" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex h-screen justify-center">Single Post View</main>
    </>
  );
};

export default SinglePostView;
