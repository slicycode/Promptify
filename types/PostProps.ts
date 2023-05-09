import { UserProps } from "./UserProps";

export type PostProps = {
  _id: string;
  creator: UserProps;
  prompt: string;
  tags: string;
};
