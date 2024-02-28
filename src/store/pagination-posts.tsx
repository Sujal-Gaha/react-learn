// useContext

import { createContext, useContext } from "react";

type TPostPaginationCtx = {
  page: number;
  globalText: string;
  sayHello: null | Function;
};
// createContext
const PostPaginationCtx = createContext<TPostPaginationCtx>({
  page: 1,
  globalText: "hello world",
  sayHello: null,
});

// Provider component
export function PostPaginationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PostPaginationCtx.Provider
      value={{
        page: 1,
        globalText: "Post list application",
        sayHello: () => {
          console.log("hello world");
        },
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