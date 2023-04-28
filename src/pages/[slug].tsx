import { type NextPage } from "next";
import Head from "next/head";
import { api } from "~/utils/api";

const ProfileView: NextPage = () => {
  const { data, isLoading } = api.profile.getUserByUsername.useQuery({
    username: "facundop3",
  });

  if (isLoading) return <div>Loading...</div>;
  if (!data) return <div>Something went wrong!</div>;
  return (
    <>
      <Head>
        <title>Profile</title>
        <meta name="description" content="Welcome to Twitter Clone" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex h-screen justify-center">{data.username}</main>
    </>
  );
};

export default ProfileView;
