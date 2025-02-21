import { For, Setter } from "solid-js";

const Pagination = (props: {
  pages: number[];
  currentPage: number;
  setPage: Setter<number>;
}) => {
  return (
    <div class="join lg:order-2">
      <For each={props.pages}>
        {(page) => (
          <button
            onClick={() => {
              props.setPage(page);
            }}
            class={
              page === props.currentPage
                ? "join-item btn btn-md bg-[#11253E] text-white"
                : "join-item btn btn-md"
            }
          >
            {page}
          </button>
        )}
      </For>
    </div>
  );
};

export default Pagination;
