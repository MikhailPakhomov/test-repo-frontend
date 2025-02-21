import CardListItem from "./CardListItem/CardListItem";
import { TCardItem } from "../../types/CardItem";
import {
  createEffect,
  createMemo,
  createSignal,
  For,
  Match,
  Show,
  Switch,
} from "solid-js";
import { fetchUsers } from "./../../api/apiClient";
import { createQuery } from "@tanstack/solid-query";
import Pagination from "../ui/Pagination/Pagination";
import { queryClient } from "../..";

const CardList = () => {
  const [page, setPage] = createSignal(1);
  const [limit, setLimit] = createSignal(4);

  const users = createQuery(() => ["users"], fetchUsers, {
    refetchInterval: 600000,
  });

  const limits = [4, 8, 10];
  const paginatedUsers = createMemo(() => {
    const start = (page() - 1) * limit();
    return users.data?.slice(start, start + limit()) ?? [];
  });

  const totalPages = createMemo(() => {
    return Math.ceil((users.data?.length ?? 0) / limit());
  });

  const pages = createMemo(() =>
    Array.from({ length: totalPages() }, (_, i) => i + 1)
  );

  const handleChangeLimit = (limit: number) => {
    setPage(1);
    setLimit(limit);
  };

  return (
    <div class="mb-4">
      <h1 class="mb-4 mt-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 text-center">
        Users
      </h1>

      <Switch>
        <Match when={users.isLoading}>
          <span class="loading loading-dots loading-lg"></span>
        </Match>
        <Match when={users.isError}>
          <span>Error: {(users.error as Error).message}</span>
        </Match>
        <Match when={users.isSuccess}>
          <div class="flex flex-col items-center gap-[15px]">
            <div class="flex justify-between w-[100%]">
              <button
                onClick={() => {
                  users.refetch();
                }}
                class="flex justify-center items-center gap-[6px] bg-[#11253E] h-[42px] rounded-md p-2"
              >
                <span class="text-white text-[14px]">Обновить</span>
              </button>
              <div class="flex items-center">
                <span class="mr-[10px]">Показывать по:</span>
                <div class="flex gap-2">
                  <For each={limits}>
                    {(lim) => (
                      <button
                        onclick={() => {
                          handleChangeLimit(lim);
                        }}
                        class={
                          lim === limit() ? "p-1 text-lg font-semibold" : "p-1"
                        }
                      >
                        {lim}
                      </button>
                    )}
                  </For>
                </div>
              </div>
            </div>

            <div class="grid grid-cols-4 gap-4">
              <For each={paginatedUsers()}>
                {(user) => <CardListItem {...user} />}
              </For>
            </div>
            <Show when={limit() < 10}>
              <Pagination
                pages={pages()}
                setPage={setPage}
                currentPage={page()}
              />
            </Show>
          </div>
        </Match>
      </Switch>
    </div>
  );
};

export default CardList;
