"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

import Profile from "@/components/Profile";
import { useRouter } from "next/navigation";
import { PostProps } from "@/types/PostProps";
import { toast } from "react-hot-toast";

export default function MyProfile() {
  const { data: session, status } = useSession() as any;
  const router = useRouter();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const res = await fetch(`/api/users/${session.user.id}/posts`);
        const data = await res.json();

        setPosts(data);
      } catch (error) {
        toast.error("Something went wrong");
      }
    };

    if (status === "authenticated") {
      getPosts();
    }

    if (status === "unauthenticated") {
      toast.error("Logged out, redirecting to home page");
      router.push("/");
    }
  }, [session, status]);

  const handleEdit = async (post: PostProps) => {
    router.push(`/update-prompt?id=${post._id}`);
  };

  const handleDelete = async (post: PostProps) => {
    const hasConfirmed = confirm(
      "Are you sure you want to delete this prompt?"
    );

    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${post._id.toString()}`, {
          method: "DELETE",
        });

        const filteredPosts = posts.filter(
          (p: PostProps) => p._id !== post._id
        );

        setPosts(filteredPosts);
        toast.success("Prompt deleted successfully");
      } catch (error) {
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <Profile
      name="My"
      description="Welcome to your personalized profile page"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
}
