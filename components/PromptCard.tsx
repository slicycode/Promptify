"use client";

import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import DOMPurify from "dompurify";

import type { PromptCardProps } from "@/types/PromptCardProps";

export default function PromptCard({
  post,
  handleTagClick,
  handleEdit,
  handleDelete,
  searchText,
}: PromptCardProps) {
  const { data: session } = useSession() as any;
  const pathName = usePathname();
  const router = useRouter();
  const [copied, setCopied] = useState("");

  const handleCopy = () => {
    navigator.clipboard.writeText(post.prompt);
    setCopied(post.prompt);
    setTimeout(() => {
      setCopied("");
    }, 3000);
  };

  const highlightSearchTerm = (text: string, searchTerm: string) => {
    if (!searchTerm) return text;

    const regex = new RegExp(searchTerm, "gi");
    const highlightedText = text.replace(
      regex,
      (match) => `<mark class="highlight">${match}</mark>`
    );

    return DOMPurify.sanitize(highlightedText);
  };

  const handleProfileClick = () => {
    if (post.creator._id === session?.user.id) return router.push("/profile");

    router.push(`/profile/${post.creator._id}?name=${post.creator.username}`);
  };

  const tags = post.tags.split(" ");

  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div
          className="flex-1 flex justify-start items-center gap-3 cursor-pointer"
          onClick={handleProfileClick}
        >
          <Image
            src={post?.creator?.image}
            alt="user_image"
            width={40}
            height={40}
            className="rounded-full object-contain"
          />

          <div className="flex flex-col">
            <h3
              className="font-satoshi font-semibold text-gray-900"
              dangerouslySetInnerHTML={{
                __html: highlightSearchTerm(
                  post.creator.username,
                  searchText as string
                ),
              }}
            ></h3>
            <p
              className="font-inter text-sm text-gray-500"
              dangerouslySetInnerHTML={{
                __html: highlightSearchTerm(
                  post.creator.email,
                  searchText as string
                ),
              }}
            ></p>
          </div>
        </div>

        <div className="copy_btn group relative" onClick={handleCopy}>
          <Image
            src={
              copied === post.prompt
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
            alt={copied === post.prompt ? "tick_icon" : "copy_icon"}
            width={12}
            height={12}
          />
          <span className="tooltip w-[75px] text-center -right-[22px] top-8">
            {copied === post?.prompt ? "Copied ✨" : "Copy ✨"}
          </span>
        </div>
      </div>

      <p
        className="my-4 font-satoshi text-sm text-gray-700"
        dangerouslySetInnerHTML={{
          __html: highlightSearchTerm(post.prompt, searchText as string),
        }}
      ></p>
      <p className="font-inter text-sm blue_gradient">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="mr-2 cursor-pointer"
            onClick={() => handleTagClick && handleTagClick(tag)}
          >
            #{tag}
          </span>
        ))}
      </p>

      {session?.user.id === post.creator._id && pathName === "/profile" && (
        <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
          <p
            className="font-inter text-sm green_gradient cursor-pointer"
            onClick={() => handleEdit && handleEdit(post)}
          >
            Edit
          </p>
          <p
            className="font-inter text-sm orange_gradient cursor-pointer"
            onClick={() => handleDelete && handleDelete(post)}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  );
}
