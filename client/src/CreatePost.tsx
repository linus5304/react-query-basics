import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useRef } from "react";
import Post from "./Post";
import { createPost } from "./api/posts";

type createPostProps = {
  setCurrentPage: (page: JSX.Element) => void;
};

export const CreatePost: React.FC<createPostProps> = ({ setCurrentPage }) => {
  const titleRef = useRef();
  const bodyRef = useRef();
  const queryClient = useQueryClient();

  const createPostMutation = useMutation({
    // mutationKey: "createPost",
    mutationFn: createPost,
    onSuccess: data => {
      queryClient.setQueryData(["posts", data.id], data);
      queryClient.invalidateQueries(["posts"], { exact: true });
      setCurrentPage(<Post id={data.id!} />);
    },
  });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    createPostMutation.mutate({
      title: titleRef?.current?.value ?? "",
      body: bodyRef?.current?.value ?? "",
    });
  }

  return (
    <div>
      {createPostMutation.isError && JSON.stringify(createPostMutation.error)}
      <h1>Create Post</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input id="title" ref={titleRef} />
        </div>
        <div>
          <label htmlFor="body">Body</label>
          <input id="body" ref={bodyRef} />
        </div>
        <button disabled={createPostMutation.isLoading}>
          {createPostMutation.isLoading ? "Loading..." : "Create"}
        </button>
      </form>
    </div>
  );
};
