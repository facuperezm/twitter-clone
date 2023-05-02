import type { RouterOutputs } from "~/utils/api";

import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";

import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

type PostWithUser = RouterOutputs["posts"]["getAll"][number];
export const PostView = (props: PostWithUser) => {
  const { post, author } = props;
  return (
    <div className="flex cursor-pointer flex-row gap-3 border-b border-b-zinc-700 px-4 py-3 transition-all duration-200 hover:bg-zinc-950">
      <Image
        className="h-12 w-12 rounded-full"
        src={author.profileImageUrl}
        alt={`${author.username}'s profile picture`}
        width={48}
        height={48}
      />
      <div className="flex flex-col">
        <div className="flex flex-row space-x-1">
          <Link
            className="flex flex-row space-x-1"
            href={`/@${author?.username}`}
          >
            <div className="font-bold">{author?.name}</div>
            <div className="text-zinc-500">@{author?.username}</div>
            <span className="ml-2 text-zinc-500">·</span>
          </Link>
          <Link href={`/post/${post.id}`}>
            <div className="text-zinc-500">
              {dayjs(post.createdAt).fromNow()}
            </div>
          </Link>
        </div>
        <div>{post.content}</div>
      </div>
    </div>
  );
};
