import Link from "next/link";
import PromptCard from "./PromptCard";
import { ProfileProps } from "@/types/ProfileProps";

export default function Profile({
  name,
  description,
  data,
  handleEdit,
  handleDelete,
}: ProfileProps) {
  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{name} Profile</span>
      </h1>
      <p className="desc text-left">{description}</p>

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

      {data.length === 0 && (
        <p>
          You haven't created any prompts yet.{" "}
          <Link href="/create-prompt" className="blue_gradient">
            Create one now!
          </Link>
        </p>
      )}
    </section>
  );
}
