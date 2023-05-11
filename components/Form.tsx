import Link from "next/link";
import { useEffect, useState } from "react";
import { BsX } from "react-icons/bs";

type FormProps = {
  type: string;
  post: {
    prompt: string;
    tags: string;
  };
  setPost: React.Dispatch<
    React.SetStateAction<{
      prompt: string;
      tags: string;
    }>
  >;
  submitting: boolean;
  handleSubmit: (e: any) => void;
};

export default function Form({
  type,
  post,
  setPost,
  submitting,
  handleSubmit,
}: FormProps) {
  const [tagsArray, setTagsArray] = useState(
    post.tags.split(" ").filter((tag) => tag !== "")
  );

  useEffect(() => {
    if (!post) return;

    setTagsArray(post.tags.split(" ").filter((tag) => tag !== ""));
  }, [post]);

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === " " && e.currentTarget.value.trim()) {
      const tag = e.currentTarget.value.trim().replace(/^[^a-zA-Z0-9]+/g, "");
      setTagsArray([...tagsArray, tag]);
      setPost({ ...post, tags: [...tagsArray, tag].join(" ") });
      e.currentTarget.value = "";
    } else if (e.key === "Backspace" && e.currentTarget.value === "") {
      setTagsArray((prevTags) => prevTags.slice(0, prevTags.length - 1));
      setPost({ ...post, tags: tagsArray.join(" ") });
    }
  }

  function removeTag(index: number) {
    setTagsArray((prevTags) => prevTags.filter((tag, i) => i !== index));
    setPost({
      ...post,
      tags: tagsArray.filter((tag, i) => i !== index).join(" "),
    });
  }

  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{type} Post</span>
      </h1>
      <p className="desc text-left maw-w-md">
        {type} and share amazing prompts with the world, and let your
        imagination run wild with any AI-powered platform.
      </p>
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism form_gradient"
      >
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Your AI Prompt
          </span>

          <textarea
            value={post.prompt}
            onChange={(e) => setPost({ ...post, prompt: e.target.value })}
            placeholder="Write your prompt here..."
            required
            className="form_textarea"
          />
        </label>
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Tags <span className="font-normal">(webdev, ai, etc.)</span>
          </span>

          <div className="flex items-center flex-wrap gap-2">
            {tagsArray.map((tag, index) => (
              <div
                key={index}
                className="rounded-full flex gap-1 py-1 px-2 bg-gray-100 hover:bg-gray-200 cursor-pointer"
                onClick={() => removeTag(index)}
              >
                {tag}
                <BsX size={20} className="mt-[3px]" />
              </div>
            ))}

            <input
              type="text"
              placeholder="tags (hit space to add)"
              className="form_input"
              onKeyDown={handleKeyDown}
            />
          </div>
        </label>

        <div className="flex-end mx-3 mb-5 gap-4">
          <Link href="/" className="text-gray-500 text-sm">
            Cancel
          </Link>

          <button
            type="submit"
            disabled={submitting}
            className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white"
          >
            {submitting ? `${type}...` : type}
          </button>
        </div>
      </form>
    </section>
  );
}
