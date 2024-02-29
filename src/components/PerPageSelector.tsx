import { fetchPosts } from "../data/fetch-posts";
import { usePaginationPostCtx } from "../store/pagination-posts";

export function PerPageSelector() {
  const ctxResult = usePaginationPostCtx();

  const handlePerPageChange = async (selectedPerPage: number) => {
    const pageNumber = 1;
    const perPage = selectedPerPage;

    // reset the page Number to 1
    ctxResult.setPage(pageNumber);

    // set the value of perPage
    ctxResult.setPerPage(selectedPerPage);

    // slice the posts data based on the selectedPerPage
    const startIndex = perPage * (pageNumber - 1);
    const endIndex = perPage * pageNumber;

    const posts = await fetchPosts();

    const slicedPosts = posts.slice(startIndex, endIndex);
    ctxResult.setPosts(slicedPosts);
  };

  return (
    <div>
      <label htmlFor="per_page">Per Page</label>
      <select
        onChange={(event) => {
          const selectedPerPage = parseInt(event.target.value);
          handlePerPageChange(selectedPerPage);
        }}
        name="per_page"
        id="per_page"
      >
        <option>5</option>
        <option>10</option>
        <option>20</option>
      </select>
    </div>
  );
}