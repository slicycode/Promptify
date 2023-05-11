"use client";

import Link from "next/link";
import PromptCard from "./PromptCard";
import { ProfileProps } from "@/types/ProfileProps";
import { useEffect, useRef, useState } from "react";

export default function Profile({
  name,
  description,
  data,
  handleEdit,
  handleDelete,
}: ProfileProps) {
  const isMyProfile = name === "My";

  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{name} Profile</span>
      </h1>
      <p className="desc text-left">{description}</p>

      {data.length > 0 ? (
        <div className="mt-10 prompt_layout">
          {data.map((post) => (
            <PromptCard
              key={post._id}
              post={post}
              handleEdit={() => handleEdit && handleEdit(post)}
              handleDelete={() => handleDelete && handleDelete(post)}
            />
          ))}
        </div>
      ) : (
        isMyProfile && (
          <p className="mt-10">
            You haven't created any prompts yet.{" "}
            <Link href="/create-prompt" className="blue_gradient">
              Create one now!
            </Link>
          </p>
        )
      )}
    </section>
  );
}
