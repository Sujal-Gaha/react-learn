// useContext

import { createContext, useContext, useState } from "react";
import { TPost } from "../types";

type TPostPaginationCtx = {
  posts: TPost[];
  setPosts: React.Dispatch<React.SetStateAction<TPost[]>>;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  perPage: number;
  setPerPage: React.Dispatch<React.SetStateAction<number>>;
};
// createContext
const PostPaginationCtx = createContext<TPostPaginationCtx>({
  posts: [],
  setPosts: () => {},
  page: 1,
  setPage: () => {},
  perPage: 5,
  setPerPage: () => {},
});

// Provider component
export function PostPaginationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [posts, setPosts] = useState<TPost[]>([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(5);

  return (
    <PostPaginationCtx.Provider
      value={{
        posts,
        setPosts,
        page,
        setPage,
        perPage,
        setPerPage,
      }}
    >
      {children}
    </PostPaginationCtx.Provider>
  );
}

export function usePaginationPostCtx() {
  const paginationResult = useContext(PostPaginationCtx);
  return paginationResult;
}