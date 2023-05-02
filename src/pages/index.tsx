import React from "react";
import Image from "next/image";
import { SignInButton, useUser } from "@clerk/nextjs";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { api } from "~/utils/api";
import { LoadingPage, LoadingSpinner } from "~/components/loading";

import type { NextPage } from "next";
import { toast } from "react-hot-toast";
import { PageLayout } from "~/components/layout";
import { PostView } from "~/components/postview";

dayjs.extend(relativeTime);

const CreatePostWizard = () => {
  const { user } = useUser();
  const [input, setInput] = React.useState("");
  const ctx = api.useContext();

  const { mutate, isLoading: isPosting } = api.posts.create.useMutation({
    onSuccess: () => {
      setInput("");
      void ctx.posts.getAll.invalidate();
    },
    onError: (err) => {
      const errorMessage = err.data?.zodError?.fieldErrors.content;
      if (errorMessage && errorMessage[0]) {
        toast.error(errorMessage[0]);
      } else {
        toast.error("Something went wrong!");
      }
    },
  });

  if (!user) return null;

  console.log(user, "user");

  return (
    <div className="flex w-full gap-4">
      <Image
        src={user.profileImageUrl}
        alt="profile image"
        className="h-12 w-12 rounded-full"
        width={48}
        height={48}
      />
      <input
        type="text"
        max={280}
        className="w-full bg-transparent text-xl outline-none disabled:cursor-progress disabled:text-zinc-500"
        placeholder="What's happening?"
        value={input}
        disabled={isPosting}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            if (input !== "") {
              mutate({ content: input });
            }
          }
        }}
      />
      {input !== "" && !isPosting && (
        <button
          onClick={() => mutate({ content: input })}
          className="my-auto h-10 rounded-3xl bg-sky-500 px-4 font-bold text-white disabled:bg-sky-600 disabled:text-zinc-200"
          disabled={isPosting || input.length === 0}
        >
          Tweet
        </button>
      )}
      {isPosting && (
        <div className="flex items-center justify-center">
          <LoadingSpinner size={20} />
        </div>
      )}
    </div>
  );
};

const Feed = () => {
  const { data, isLoading: postLoading } = api.posts.getAll.useQuery();

  if (postLoading) return <LoadingPage />;

  if (!data) return <div>Something went wrong!</div>;

  return (
    <div className="flex flex-col text-white ">
      {data.map((fullPost) => (
        <PostView {...fullPost} key={fullPost.post.id} />
      ))}
    </div>
  );
};

const Home: NextPage = () => {
  const { isLoaded: userLoaded, isSignedIn } = useUser();

  api.posts.getAll.useQuery();

  if (!userLoaded) return <div />;

  return (
    <>
      <PageLayout>
        <div className="flex border-b border-zinc-700 p-4">
          {!isSignedIn && (
            <div className="flex justify-center">
              <SignInButton />
            </div>
          )}
          {isSignedIn && <CreatePostWizard />}
        </div>
        <Feed />
      </PageLayout>
    </>
  );
};

export default Home;
