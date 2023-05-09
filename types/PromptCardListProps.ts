import { PostProps } from "./PostProps";

export type PromptCardListProps = {
  data: PostProps[];
  handleTagClick?: (tag: string) => void;
};
