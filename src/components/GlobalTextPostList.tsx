import { usePaginationPostCtx } from "../store/pagination-posts";

export function GlobalTextPostList() {
  const paginationResult = usePaginationPostCtx();

  return (
    <button
      onClick={() => {
        if (paginationResult.sayHello) {
          paginationResult.sayHello();
        }
      }}
    >
      show global text here: {paginationResult.globalText}
    </button>
  );
}