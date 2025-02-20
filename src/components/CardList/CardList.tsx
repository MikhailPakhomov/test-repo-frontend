import CardListItem from "./CardListItem/CardListItem";
import { TCardItem } from "../../types/CardItem";
import { For, Match, Switch } from "solid-js";
import { fetchUsers } from "./../../api/apiClient";
import { createQuery } from "@tanstack/solid-query";
const CardList = () => {
  const users = createQuery(() => ["users"], fetchUsers);

  return (
    <>
      <h1>Users</h1>

      <Switch>
        <Match when={users.isLoading}>
          <span class="loading loading-dots loading-lg"></span>
        </Match>
        <Match when={users.isError}>
          <span>Error: {(users.error as Error).message}</span>
        </Match>
        <Match when={users.data !== undefined}>
          <div class="grid grid-cols-4 gap-4">
            <For each={users.data}>{(user) => <CardListItem {...user} />}</For>
          </div>
        </Match>
      </Switch>
    </>
  );
};

export default CardList;
