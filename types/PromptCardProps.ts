import { PostProps } from "./PostProps";

export type PromptCardProps = {
  post: PostProps;
  handleTagClick?: (tag: string) => void;
  handleEdit?: (post: PostProps) => void;
  handleDelete?: (post: PostProps) => void;
};
