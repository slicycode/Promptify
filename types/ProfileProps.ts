import { PostProps } from "./PostProps";

export type ProfileProps = {
  name: string;
  description: string;
  data: PostProps[];
  handleEdit?: (post: PostProps) => void;
  handleDelete?: (post: PostProps) => void;
};
